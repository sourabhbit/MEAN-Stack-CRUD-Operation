import { Injectable } from '@angular/core';
import { Item } from './item';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  endpoint: string = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }
  // url="http://localhost:8000/api/"
  // Add item
  AddItem(data: Item): Observable<any> {
    let API_URL = `${this.endpoint}/add-item`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // AddItem(data: Item)
  // {
  //   let API_URL = `${this.endpoint}/add-item`;
  //   return this.http.post(API_URL, data)
  //   // return this.http.post(this.API_URL+'add-item',data)
  // }

  // Get all items
  GetItems() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get Item
  GetItem(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-item/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Update Item
  UpdateItem(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update-item/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete item
  DeleteItem(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-item/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}