import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InjectService } from '../inject.service';

export class SuperService<T> implements ISuperService {

  // @Inject(HttpClient) protected http: HttpClient;
  protected http = InjectService.injector.get(HttpClient);
  protected urlApi: string = environment.apiUrl;
  
  constructor(public controller: string) { }

  getList(startIndex , pageSize, sortBy, sortDir) {
    return this.http
    .get<{list: T[], count: number}>(`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}`);
  }
  get = () => this.http.get<T[]>(`${this.urlApi}/${this.controller}/get`);
  count = () => this.http.get<number>(`${this.urlApi}/${this.controller}/count`);

  getForSelect = () => this.http.get<{id: number, name: string}[]>(`${this.urlApi}/${this.controller}/getForSelect`);
  
  getById = (id) => this.http.get<T>(`${this.urlApi}/${this.controller}/get/${id}`);
  post = (o: T) => this.http.post<T>(`${this.urlApi}/${this.controller}/post`, o);
  put = (id: number | string, o: T) => this.http.put<any>(`${this.urlApi}/${this.controller}/put/${id}`, o);
  delete = (id) => this.http.delete<any>(`${this.urlApi}/${this.controller}/delete/${id}`);

  updateRange(o: T[]) {
    // // console.log("updating : ", o)
    return this.http.post(`${this.urlApi}/${this.controller}/updateRange`, o);
  }

  deleteRange(o: number[]) {
    return this.http.post(`${this.urlApi}/${this.controller}/deleteRange`, o);
  }

  postRange(o: T[]) {
    // // console.log("updating : ", o)
    return this.http.post(`${this.urlApi}/${this.controller}/postRange`, o);
  }

  autocomplete(column: string, name: string) {
    // // console.log("updating : ", o)
    return this.http.get(`${this.urlApi}/${this.controller}/autocomplete/${column}/${name}`);
  }

  autocompletePost(column: string, name: string) {
    // // console.log("updating : ", o)
    return this.http.post(`${this.urlApi}/${this.controller}/autocompletePost`, {column, name});
  }
  deleteRangeByIds(ids: number[]) {
    return this.http.post(`${this.urlApi}/${this.controller}/deleteRangeByIds`, ids);
  }

}

interface ISuperService {
  getList(startIndex, pageSize, sortBy, sortDir): Observable<any>;
  get(controller: string);
  getById(id, controller: string);
  post(o);
  put(id, o);
  delete(id);
}
