import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { LivraisonClient } from 'src/app/Models/models';
import { UowService } from 'src/app/Services/uow.service';

@Component({
  selector: 'app-update-livraison',
  templateUrl: './update-livraison.component.html',
  styleUrls: ['./update-livraison.component.scss']
})
export class UpdateLivraisonComponent implements OnInit {
  subs: Subscription[] = [];

  myForm: FormGroup;
  o = new LivraisonClient();
  title = 'LivraisonClient';
  clients = this.uow.clients.getForSelect();
 
  //child
  submitEvent = new Subject<boolean>();

  constructor(private fb: FormBuilder, private uow: UowService
    , private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.createForm();

    // const id = this.route.snapshot.paramMap.get('id');
    const id = +this.route.snapshot.paramMap.get('id');

    // this.route.paramMap.pipe(take(1)).subscribe(e => {
    //   this.o.id = +e.get('id');

      // if (this.o.id === 0) return;

      if (id !== 0) {
      this.uow.livraisonClients.getById(this.o.id).subscribe(r => {
        this.o = r;
        this.myForm.patchValue(this.o);
      })
    }

  }

  async delete(o: LivraisonClient) {
    const r = await this.uow.deleteDialog.openDialog('LivraisonClient').toPromise();
    if (r === 'ok') {
      const sub = this.uow.livraisonClients.delete(o.id).subscribe(() => {

        this.back();
      });

      this.subs.push(sub);
    }
  }

  back(): void {

    this.router.navigate([this.router.url.substring(0, this.router.url.indexOf('/update'))]);
  }

  submit(o: LivraisonClient): void {
    let sub = null;
    o.detailLivraisonClients = this.o.detailLivraisonClients;
    console.log(o.detailLivraisonClients);
    if (o.id === 0) {
      sub = this.uow.livraisonClients.post(o).subscribe(r => {
        this.uow.snackAdd();
        Object.assign(this.o, r);
        this.submitEvent.next(true);
        // this.o = r;
        this.createForm();
        this.router.navigate([this.router.url.replace(this.route.snapshot.paramMap.get('id'), r.id.toString())]);
      });
    } else {
      sub = this.uow.livraisonClients.put(o.id, o).subscribe(r => {
        // this.uow.snackUpdate();
        this.submitEvent.next(true);

      });
    }

    this.subs.push(sub);
  }

  createForm() {
    this.myForm = this.fb.group({
      id: [this.o.id],
      numero: [this.o.numero, []],
      dateCreation: [this.o.date, []],
      info: [this.o.info, []],
      montantHT: [this.o.montantHT, []],
      tva: [this.o.tva, []],
      montantTTC: [this.o.montantTTC, []],
      idClient: [this.o.idClient, [Validators.min(1),]],
    
    });
  }

  resetForm() {
    this.o = new LivraisonClient();
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subs.forEach(e => {
      e.unsubscribe();
    });
  }
}

