
import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { DetailLivraisonClient } from '../Models/models';

@Injectable({
  providedIn: 'root'
})
export class DetailLivraisonClientService extends SuperService<DetailLivraisonClient> {

  constructor() {
    super('detailLivraisonClients');
  }

  getAll(startIndex, pageSize, sortBy, sortDir, idLivraisonClient) {
    return this.http.get<{ list: DetailLivraisonClient[], count: number }>(`${this.urlApi}/${this.controller}/getPage/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${idLivraisonClient}`);
  }

  putRange(idLivraisonClient, models) {
    return this.http.post(`${this.urlApi}/${this.controller}/putRange/${idLivraisonClient}`, models);
  }
}
