import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Subject, Subscription } from 'rxjs';
import { LivraisonClient } from '../Models/models';
import { UowService } from '../Services/uow.service';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-livraison-client',
  templateUrl: './livraison-client.component.html',
  styleUrls: ['./livraison-client.component.scss']
})
export class LivraisonClientComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  update = new Subject<boolean>();
  isLoadingResults = true;
  resultsLength = 0;
  isRateLimitReached = false;

  subs: Subscription[] = [];

  dataSource: LivraisonClient[] = [];
  selectedList: LivraisonClient[] = [];

  displayedColumns = ['select',
    // 'etatLivraison',
    'numero',
    'date',
    'client',
    // 'comercial',
    'info',
    'montantHT',
    'tva',
    // 'escompte',
    'montantTTC',
    // 'situationClient',
    // 'societe',
    // 'exercice',

    'option'
  ];

  panelOpenState = false;

  now = new Date();
  numero = new FormControl('');


  dateCreationDebut = new FormControl(new Date(this.now.getFullYear()-1, this.now.getMonth() - 1, this.now.getDate()));
  dateCreationFin = new FormControl(new Date(this.now.getFullYear()+1, this.now.getMonth(), this.now.getDate()));


  montantTTCMin = new FormControl(0);
  montantTTCMax = new FormControl(0);

  // etatLivraisons = this.uow.etatLivraisons.getForSelect();
  // idEtatLivraison = new FormControl(0);

  // comercials = this.uow.comercials.getForSelect();
  // idComercial = new FormControl(0);
  clients = this.uow.clients.getForSelect();
  idClient = new FormControl(0);


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


        this.getPage(
          startIndex,
          this.paginator.pageSize,
          this.sort.active ? this.sort.active : 'id',
          this.sort.direction ? this.sort.direction : 'desc',
          this.numero.value === '' ? '*' : this.numero.value,

          this.dateCreationDebut.value,
          this.dateCreationFin.value,

          this.montantTTCMin.value,
          this.montantTTCMax.value,
          // this.idEtatLivraison.value,
          // this.idComercial.value,
          this.idClient.value,
        );
      }
    );

    this.subs.push(sub);
  }

  reset() {
    this.numero.setValue('');


    this.dateCreationDebut.setValue(new Date(this.now.getFullYear()-1, this.now.getMonth() - 1, this.now.getDate()));
    this.dateCreationFin.setValue(new Date(this.now.getFullYear()+1, this.now.getMonth(), this.now.getDate()));


    this.montantTTCMin.setValue(0);
    this.montantTTCMax.setValue(0);

    // this.idEtatLivraison.setValue(0);
    // this.idComercial.setValue(0);
    this.idClient.setValue(0);

    this.update.next(true);
  }

  search() {
    this.update.next(true);
  }

  getPage(startIndex, pageSize, sortBy, sortDir, numero, dateCreationDebut, dateCreationFin, montantTTCMin, montantTTCMax , idClient) {
    this.isLoadingResults = true;

    const sub = this.uow.livraisonClients.getAll(startIndex, pageSize, sortBy, sortDir, numero, dateCreationDebut, dateCreationFin, montantTTCMin, montantTTCMax, idClient).subscribe(
      (r: any) => {
        console.log(r.list);
        this.dataSource = r.list;
        this.resultsLength = r.count;
        this.isLoadingResults = false;
      }, e => {
        this.isLoadingResults = false;
      }
    );

    this.subs.push(sub);
  }


  add() {
    this.router.navigate(['updateLivraison', 0], { relativeTo: this.route });
  }

  edit(o: LivraisonClient) {
    this.router.navigate(['updateLivraison', o.id], { relativeTo: this.route });
  }

  async delete(o: LivraisonClient) {
    const r = await this.uow.deleteDialog.openDialog('LivraisonClient').toPromise();
    if (r === 'ok') {
      const sub = this.uow.livraisonClients.delete(o.id).subscribe(() => this.update.next(true));

      this.subs.push(sub);
    }
  }

  imgError(img: any) {
    img.src = 'assets/404.jpg';
  }

  //check box£
  //
  isSelected(row: LivraisonClient): boolean {
    return this.selectedList.find(e => e.id === row.id) ? true : false;
  }

  check(row: LivraisonClient) {
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

  async deleteList() {
    const r = await this.uow.deleteDialog.openDialog('LivraisonClient').toPromise();
    if (r === 'ok') {
      const sub = this.uow.livraisonClients.deleteRangeByIds(this.selectedList.map(e => e.id)).subscribe(() => {
        this.selectedList = [];
        this.update.next(true);
      });

      this.subs.push(sub);
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(e => {
      e.unsubscribe();
    });
  }

}
