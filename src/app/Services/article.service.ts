import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SuperService } from './super.service';

const API_URL = environment.apiUrl + '/articles';
@Injectable({
  providedIn: 'root'
})
export class ArticleService  extends SuperService<any>  {

  constructor() { 
    super('articles');
  }
}
