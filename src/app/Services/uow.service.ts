
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InjectService } from '../inject.service';
import { ArticleService } from './article.service';
import { ClientService } from './client.service';
import { DeleteService } from './delete.service';
import { DetailLivraisonClientService } from './detailLivraisonClient.service';
import { LivraisonClientService } from './livraisonClient.service';


@Injectable({
  providedIn: 'root'
})
export class UowService {
  config = {};// new ConfigService();
  articles = new ArticleService();
  clients = new ClientService();
  livraisonClients = new LivraisonClientService();
  detailLivraisonClients = new DetailLivraisonClientService();
 
  
  //utils
  snackBar = InjectService.injector.get(MatSnackBar);
   deleteDialog = InjectService.injector.get(DeleteService);

  constructor(private http: HttpClient) { }

  snackGen(message = '', action = null, config = { panelClass: ['green-snackbar'], duration: 2000 }) {
    this.snackBar.open(message, action, config);
  }

  snackOk(message = 'Sauvegarde ressié') {
    const config = {
      panelClass: ['green-snackbar'],
      duration: 2000
    };

    this.snackBar.open(message, null, config);
  }


  snackAdd(message = 'Element successfully Added') {
    const config = {
      panelClass: ['green-snackbar'],
      duration: 2000
    };

    this.snackBar.open(message, null, config);
  }

  snackUpdate(message = 'Element successfully Updated') {
    const config = {
      panelClass: ['green-snackbar'],
      duration: 2000
    };

    this.snackBar.open(message, null, config);
  }

  snackDelete(message = 'Element successfully Deleted') {
    const config = {
      panelClass: ['green-snackbar'],
      duration: 2000
    };

    this.snackBar.open(message, null, config);
  }
}
