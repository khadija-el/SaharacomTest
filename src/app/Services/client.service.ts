
import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { Client } from '../Models/models';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends SuperService<Client> {

  constructor() {
    super('clients');
  }

  getAll(startIndex, pageSize, sortBy, sortDir, raisonSocial) {
    return this.http.get(`${this.urlApi}/${this.controller}/getPage/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${raisonSocial}`);
  }
}