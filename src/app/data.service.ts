import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private _http:HttpClient
  ) { }

  getComplaintList(){
    // const commentIndex = Math.floor(Math.random() * ((5 - 1) + 1) + 1);
    return this._http.get(`https://jsonplaceholder.typicode.com/photos`);
  }
}
