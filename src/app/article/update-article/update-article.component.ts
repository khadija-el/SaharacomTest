import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/Models/models';
import { UowService } from 'src/app/Services/uow.service';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss']
})
export class UpdateArticleComponent implements OnInit,OnDestroy {
  subs: Subscription[] = [];

  myForm: FormGroup;
  o = new Article();
  title = 'Article';
  
  constructor(private fb: FormBuilder, private uow: UowService
    , private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.createForm();

    const id = +this.route.snapshot.paramMap.get('id');

      if (id !== 0) {
        this.uow.articles.getById(id).subscribe(r => {
          this.o = r;
          this.createForm();
          // this.myForm.patchValue(this.o);
        })
      }

  }

  async delete(o: Article) {
    const r = await this.uow.deleteDialog.openDialog('Article').toPromise();
    if (r === 'ok') {
      const sub = this.uow.articles.delete(o.id).subscribe(() => {

        this.back();
      });

      this.subs.push(sub);
    }
  }

  back(): void {

    this.router.navigate([this.router.url.substring(0, this.router.url.indexOf('/update'))]);
  }

  submit(o: Article): void {
    let sub = null;
    if (o.id === 0) {
      sub = this.uow.articles.post(o).subscribe(r => {
        this.uow.snackAdd();
        this.emitUploadSubmit()

        this.o = r;
        this.createForm();
        this.router.navigate([this.router.url.replace(this.route.snapshot.paramMap.get('id'), r.id.toString())]);
      });
    } else {
      sub = this.uow.articles.put(o.id, o).subscribe(r => {
        this.uow.snackUpdate();
        this.emitUploadSubmit()
      });
    }

    this.subs.push(sub);
  }

  createForm() {
    this.myForm = this.fb.group({
      id: [this.o.id, [Validators.min(1),]],
      refFournisseur: [this.o.reference, []],
      designation: [this.o.designation, []],
      stockInitial: [this.o.stockInitial, [Validators.min(1),]],
      stockFinal: [this.o.stockFinal, [Validators.min(1),]],
      qteEntree: [this.o.qteAcheté, [Validators.min(1),]],
      qteSortie: [this.o.qteVendue, [Validators.min(1),]],
      prixAchatHT: [this.o.prixAchatHT, []],
      prixAchatTTC: [this.o.prixAchatTTC, []],
      prixVenteHT: [this.o.prixVenteHT, []],
      prixVenteTTC: [this.o.prixVenteTTC, []],
      info: [this.o.info, []],
     
    });
  }

  get imagesFC() { return this.myForm.get('images') as FormControl }

  emitUploadSubmit() {
    (this.imagesFC as any).isUploaded = true;
    this.imagesFC.setValue(this.imagesFC.value, { onlySelf: true });
  }


  resetForm() {
    this.o = new Article();
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subs.forEach(e => {
      e.unsubscribe();
    });
  }
}

