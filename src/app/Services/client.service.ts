
import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { Client } from '../Models/models';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl + '/clients';
@Injectable({
  providedIn: 'root'
})
export class ClientService extends SuperService<any> {

  constructor() {
    super('Client');
  }

  // getAll(startIndex, pageSize, sortBy, sortDir, raisonSocial) {
  //   return this.http.get(`${this.urlApi}/${this.controller}/getPage/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${raisonSocial}`);
  // }
}