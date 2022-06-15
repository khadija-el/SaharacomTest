
import { Component, OnInit, ViewChild, EventEmitter, Inject, OnDestroy } from '@angular/core';
import { merge, Subscription, Subject } from 'rxjs';
import { UpdateComponent } from './update/update.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../Models/models';
import { UowService } from '../Services/uow.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  update = new Subject<boolean>();
  isLoadingResults = true;
  resultsLength = 0;
  isRateLimitReached = false;

  subs: Subscription[] = [];

  dataSource: Client[] = [];
  selectedList: Client[] = [];

  displayedColumns = ['select',
    'raisonSocial',
    'tel',
    'email',
    'adresse',
    // 'capital',
    // 'rc',
    // 'cnss',
    // 'patente',
    // 'ice',
    // 'rib',
    'banque',

    'option'
  ];

  panelOpenState = false;

  now = new Date();
  raisonSocial = new FormControl('');


  constructor(public uow: UowService
    , private router: Router, private route: ActivatedRoute

  ) {
  }

  ngOnInit() {
    const sub = merge(this.sort.sortChange, this.paginator.page, this.update).pipe(startWith(null as any)).subscribe(
      r => {
        r === true ? this.paginator.pageIndex = 0 : r = r;
        !this.paginator.pageSize ? this.paginator.pageSize = 10 : r = r;
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.isLoadingResults = true;
        this.getPage(
          startIndex,
          this.paginator.pageSize,
          this.sort.active ? this.sort.active : 'id',
          this.sort.direction ? this.sort.direction : 'desc',
          this.raisonSocial.value === '' ? '*' : this.raisonSocial.value,

        );
      }
    );

    this.subs.push(sub);
  }

  reset() {
    this.raisonSocial.setValue('');


    this.update.next(true);
  }

  search() {
    this.update.next(true);
  }

  getPage(startIndex, pageSize, sortBy, sortDir, raisonSocial) {
    const sub = this.uow.clients.getAll(startIndex, pageSize, sortBy, sortDir, raisonSocial).subscribe(
      (r: any) => {
        console.log(r.list);
        this.dataSource = r.list;
        this.resultsLength = r.count;
        this.isLoadingResults = false;
      }
    );

    this.subs.push(sub);
  }


  add() {
    this.router.navigate(['update', 0], { relativeTo: this.route });
  }

  edit(o: Client) {
    this.router.navigate(['update', o.id], { relativeTo: this.route });
  }

  async delete(o: Client) {
    const r = await this.uow.deleteDialog.openDialog('Client').toPromise();
    if (r === 'ok') {
      const sub = this.uow.clients.delete(o.id).subscribe(() => this.update.next(true));

      this.subs.push(sub);
    }
  }

  imgError(img: any) {
    img.src = 'assets/404.jpg';
  }

  //check box
  //
  isSelected(row: Client): boolean {
    return this.selectedList.find(e => e.id === row.id) ? true : false;
  }

  check(row: Client) {
    const i = this.selectedList.findIndex(o => row.id === o.id);
    const existe: boolean = i !== -1;

    existe ? this.selectedList.splice(i, 1) : this.selectedList.push(row);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selectedList.length;
    const numRows = this.dataSource.length;

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selectedList = [] : this.selectedList = Array.from(this.dataSource);
  }

  // async deleteList() {
  //     const r = await this.uow.deleteDialog.openDialog('Client').toPromise();
  //     if (r === 'ok') {
  //         const sub = this.uow.clients.deleteRangeByIds(this.selectedList.map(e => e.id)).subscribe(() => {
  //             this.selectedList = [];
  //             this.update.next(true);
  //         });

  //         this.subs.push(sub);
  //     }
  // }

  ngOnDestroy(): void {
    this.subs.forEach(e => {
      e.unsubscribe();
    });
  }

}


