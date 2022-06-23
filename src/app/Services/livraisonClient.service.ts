
import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { LivraisonClient } from '../Models/models';

@Injectable({
  providedIn: 'root'
})
export class LivraisonClientService extends SuperService<LivraisonClient> {

  constructor() {
    super('livraisonClients');
  }

  getAll(startIndex, pageSize, sortBy, sortDir, numero, dateCreationDebut, dateCreationFin, montantTTCMin, montantTTCMax, idClient) {
    return this.http.get(`${this.urlApi}/${this.controller}/getPage/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${numero}/${dateCreationDebut}/${dateCreationFin}/${montantTTCMin}/${montantTTCMax}/${idClient}`);
  }
}