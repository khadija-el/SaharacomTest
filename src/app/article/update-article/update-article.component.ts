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
export class UpdateArticleComponent implements OnInit, OnDestroy {
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
    //  this.router.navigate([this.router.url.substring(0, this.router.url.indexOf('/update'))]);
     this.router.navigate(['/article']);

  }

  submit(o: Article): void {
    let sub = null;

    if (o.id === 0) {
      console.log(o);
      sub = this.uow.articles.post(o).subscribe(r => {
        this.uow.snackAdd();

        this.o = r;
        this.createForm();
        this.router.navigate([this.router.url.replace(this.route.snapshot.paramMap.get('id'), r.id.toString())]);
      });
    } else {

      sub = this.uow.articles.put(o.id, o).subscribe(r => {
        this.uow.snackUpdate();
        // this.emitUploadSubmit()
      });
    }

    this.subs.push(sub);
  }

  createForm() {
    this.myForm = this.fb.group({
      id: [this.o.id, [Validators.min(1),]],
      reference: [this.o.reference, []],
      designation: [this.o.designation, []],
      stockinitial: [this.o.stockinitial, [Validators.min(1),]],
      stockfinal: [this.o.stockfinal, [Validators.min(1),]],
      qteachete: [this.o.qteachete, [Validators.min(1),]],
      qtevendue: [this.o.qtevendue, [Validators.min(1),]],
      prixachatHt: [this.o.prixachatHt, []],
      prixachatttc: [this.o.prixachatttc, []],
      prixventeHt: [this.o.prixventeHt, []],
      prixventettc: [this.o.prixventettc, []],
      info: [this.o.info, []],

    });
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

