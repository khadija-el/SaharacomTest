import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { merge, Subject, Subscription } from 'rxjs';
import { Article } from '../Models/models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UowService } from '../Services/uow.service';
import { startWith } from 'rxjs/operators';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit,OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  update = new Subject<boolean>();
  isLoadingResults = true;
  resultsLength = 0;
  isRateLimitReached = false;

  subs: Subscription[] = [];

  dataSource: Article[] = [];
  selectedList: Article[] = [];

  displayedColumns = [
    //  'select',
    'reference',
    'designation',
    'stockinitial',
    'stockfinal',
    'qteacheté',
    'qtevendue',
    'prixachatht',
    'prixachatttc',
    'prixventeht',
    'prixventettc',
    'info',
    'option'
  ];

  panelOpenState = false;

  now = new Date();
  reference = new FormControl('');
  designation = new FormControl('');


  constructor(public uow: UowService
    , private router: Router, private route: ActivatedRoute

  ) {
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
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
        );
      }
    );

    this.subs.push(sub);
  }

  getPage(startIndex, pageSize, sortBy, sortDir) {
    const sub = this.uow.articles.getList(startIndex, pageSize, sortBy, sortDir).subscribe(
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
    // this.router.navigate(['update', 0], { relativeTo: this.route });
    this.router.navigate(['/update', 0]);
  }

  edit(o: Article) {
    // this.router.navigate(['update', o.id], { relativeTo: this.route });
    this.router.navigate(['/update', o.id]);

  }

  async delete(o: Article) {
    const r = await this.uow.deleteDialog.openDialog('Article').toPromise();
    if (r === 'ok') {
      const sub = this.uow.articles.delete(o.id).subscribe(() => this.update.next(true));

      this.subs.push(sub);
    }
  }
  async deleteList() {
    const r = await this.uow.deleteDialog.openDialog('Article').toPromise();
    if (r === 'ok') {
      const sub = this.uow.articles.deleteRangeByIds(this.selectedList.map(e => e.id)).subscribe(() => {
        this.selectedList = [];
        this.update.next(true);
      });

      this.subs.push(sub);
    }
  }

}
