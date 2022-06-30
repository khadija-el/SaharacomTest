import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { merge, Subject, Subscription } from 'rxjs';
import { Article, DetailLivraisonClient, LivraisonClient } from 'src/app/Models/models';
import { UowService } from 'src/app/Services/uow.service';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { cloneDeep, sum } from 'lodash';

@Component({
  selector: 'app-detail-livraison-client',
  templateUrl: './detail-livraison-client.component.html',
  styleUrls: ['./detail-livraison-client.component.scss']
})
export class DetailLivraisonClientComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() parent: LivraisonClient;
  // @Input() submitEvent: Subject<boolean>;

  update = new Subject<boolean>();
  isLoadingResults = false;

  subs: Subscription[] = [];

  // dataSource: DetailLivraisonClient[] = [];

  form: FormGroup;
  livraisonClient: number;

  totalHT = 0;

  displayedColumns = [
    'id',
    'article',
    // 'designation',
    'qte',
    'puvhT_Brut',
    'remiseHT',
    'montantHT',
    // 'tva',
    // 'pUVTTC_Brut',
    // 'remise_TTC',
    // 'montantTTC',
    // 'livraisonClient',
    // 'societe',
    // 'unite',

    'option'
  ];

  constructor(public uow: UowService, private fb: FormBuilder
    // , private router: Router, private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      dataSource: this.fb.array([])
    });

    this.livraisonClient = this.parent.id;// +this.route.snapshot.paramMap.get('id');

    const sub = merge(this.sort.sortChange, this.update).pipe(startWith(null as any)).subscribe(
      r => {

        if (this.parent.id === 0) {
          this.add();
          return;
        }

        this.getPage(
          0,
          0,//this.paginator.pageSize,
          this.sort.active ? this.sort.active : 'id',
          this.sort.direction ? this.sort.direction : 'desc',
          this.parent.id
        );
      }
    );

    this.subs.push(sub);

    // this.submitEvent.subscribe(_ => this.submit());

    this.form.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((r: { dataSource: DetailLivraisonClient[] }) => {

      // console.warn(r.dataSource.map(e => e.article))
      this.totalHT = sum(r.dataSource.map(e => +e.montantHT));

      this.parent.montantHT = this.totalHT;
      this.parent.detailLivraisonClients = cloneDeep(r.dataSource)
      this.parent.detailLivraisonClients = this.parent.detailLivraisonClients
        .filter(e => e.idArticle !== null)
        .map(e => {
          delete e.article;
          return e;
        });

      setTimeout(() => {
        this.generatePdf();
      }, 300);
    });
  }

  generatePdf() {
    const header = [ 'article', 'qte', 'puvhT_Brut', 'remiseHT', 'montantHT'];

    // formatDate(this.dateCreationDebut.value, 'dd-MM-yyyy', 'fr-FR')
    // { text: new DatePipe('fr-FR').transform(e.date, 'dd/MM/yyyy') },

    const body = (this.dataSourceFA.value as DetailLivraisonClient[]).map(e => {
      return [ e.article as any, e.qte, e.puvhT_Brut, e.remiseHT, e.montantHT];
    });

    // footer
    const footer = [
      ['', '', '', 'Total HT', this.totalHT.toString()],
      ['', '', '', 'Total TVA', this.totalHT.toString()],
      ['', '', '', 'Escompte', this.totalHT.toString()],
      ['', '', '', 'Total Net TTC', this.totalHT.toString()],
    ]

    // this.pdf2.generatePdf({header, body, footer});
    // this.pdf.generatePdf(myBody, 'A4', `${this.session.user.nom} ${this.session.user.prenom}`, 'Detail Livraison Client');
  }

  trackByFn(index: any, e: any) {
    return `${e.value.idArticle}`;
  }

  rowChange(row: FormGroup, e: Article = null) {
    if (e) {
      row.get('article').setValue(e.designation);
      row.get('puvhT_Brut').setValue(e.prixventeHt);
    }

    const qte = +row.get('qte').value;
    const puvhT_Brut = +row.get('puvhT_Brut').value;

    const remiseHT = +row.get('remiseHT').value / 100;

    const tva = +row.get('tva').value;

    const montantHT = ((qte * puvhT_Brut) * (1 - remiseHT)) - tva;

    row.get('montantHT').setValue(montantHT);
  }

  getPage(startIndex, pageSize, sortBy, sortDir, idLivraisonClient) {
    this.isLoadingResults = true;

    const sub = this.uow.detailLivraisonClients.getAll(startIndex, pageSize, sortBy, sortDir, idLivraisonClient).subscribe(
      (r) => {
        if (r.list.length === 0) {
          this.add();
        } else {
          // this.dataSource = r.list;
          // this.form.setControl('dataSource', new FormArray([this.createForm(this.dataSource[0])]));
          this.form.setControl('dataSource', new FormArray(r.list.map(e => this.createForm(e))));
        }

        this.isLoadingResults = false;
      }, e => {
        this.isLoadingResults = false
      }
    );

    this.subs.push(sub);
  }

  get dataSourceFA(): FormArray {
    return this.form.get('dataSource') as FormArray;
  }

  set dataSourceFA(e: FormArray) {
    this.form.setControl('dataSource', e);
  }

  createForm(o: DetailLivraisonClient) {
    return this.fb.group({
      id: [o.id],
      numero: [o.numero, []],
      qte: [o.qte, [Validators.min(1),]],
      puvhT_Brut: [o.puvhT_Brut, []],
      remiseHT: [o.remiseHT, []],
      montantHT: [o.montantHT, []],
      pUVTTC_Brut: [o.pUVTTC_Brut, []],
      // remise_TTC: [o.remise_TTC, []],
      montantTTC: [o.montantTTC, []],
      tva: [o.tva, []],
      idLivraisonClient: [this.parent.id, [Validators.min(1),]],
      idArticle: [o.idArticle, [Validators.min(1),]],
      article: [o.article, [Validators.min(1),]],
    });
  }

  add() {
    this.dataSourceFA.insert(0, this.createForm(new DetailLivraisonClient()), { emitEvent: false });
    // this.dataSourceFA.push(this.createForm(new DetailLivraisonClient()), { emitEvent: true });
    // console.log(this.dataSourceFA.value.map(e => e.idArticle))
     this.dataSourceFA = cloneDeep(this.dataSourceFA);
  }

  async delete(index: number) {
    this.dataSourceFA.removeAt(index);
     this.dataSourceFA = cloneDeep(this.dataSourceFA);
  }

  ngOnDestroy(): void {
    this.subs.forEach(e => {
      e.unsubscribe();
    });
  }
}