import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/Models/models';
import { UowService } from 'src/app/Services/uow.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  subs: Subscription[] = [];

  myForm: FormGroup;
  o = new Client();
  title = 'Client';
// banques = this.uow.banques.getForSelect();

  constructor(private fb: FormBuilder, private uow: UowService
  , private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
      this.createForm();

           const id = +this.route.snapshot.paramMap.get('id');
          // this.route.paramMap.pipe(take(1)).subscribe(e => {
          //   this.o.id = +e.get('id');
         // if (this.o.id === 0) return;

            // this.uow.clients.getById(this.o.id).subscribe(r => {
            //   this.o = r;
            //   this.myForm.patchValue(this.o);
            // })

            if (id  !== 0) {
              this.uow.clients.getById(id).subscribe(r => {
                console.log(r)
                this.o = r;
                this.createForm();
                // this.myForm.patchValue(this.o);
              })
            }
      }

  async delete(o: Client) {
      const r = await this.uow.deleteDialog.openDialog('Client').toPromise();
      if (r === 'ok') {
        const sub = this.uow.clients.delete(o.id).subscribe(() => {

          this.back();
        });

        this.subs.push(sub);
      }
    }

  back(): void {

    // this.router.navigate([this.router.url.substring(0, this.router.url.indexOf('/clients'))]);
      this.router.navigate(['/clients']);

    }

  submit(o: Client): void {
      let sub = null;
      if (o.id === 0) {
          sub = this.uow.clients.post(o).subscribe(r => {
              this.uow.snackAdd();

              this.o = r;
              this.createForm();
              this.router.navigate([this.router.url.replace(this.route.snapshot.paramMap.get('id'), r.id.toString())]);
          });
      } 
      else {
          sub = this.uow.clients.put(o.id, o).subscribe(r => {
              this.uow.snackUpdate();

          });
      }

      this.subs.push(sub);
  }

  createForm() {
    this.myForm = this.fb.group({
    id: [this.o.id],
    raisonSocial: [this.o.raisonSocial, []],
    tel: [this.o.tel, []],
    email: [this.o.email, [ ]],
    adresse: [this.o.adresse, []],
   
      });
  }

  resetForm() {
      this.o = new Client();
      this.createForm();
  }

  // ngOnDestroy(): void {
  //     this.subs.forEach(e => {
  //         e.unsubscribe();
  //     });
  // }
}

