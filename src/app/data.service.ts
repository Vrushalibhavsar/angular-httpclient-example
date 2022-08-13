import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Product } from './products/products.component';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})

export class DataService {
  public first: string = "";
  public prev: string = "";
  public next: string = "";
  public last: string = "";
  private REST_API_SERVER = "http://localhost:3000/products";
  constructor(private httpClient: HttpClient) { }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  public sendGetRequest(){
    // Add safe, URL encoded _page and _limit parameters 

    return this.httpClient.get(this.REST_API_SERVER, {  params: new HttpParams({fromString: "_page=1&_limit=5"}), observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));
    }));
  }
  public sendGetRequestToUrl(url: string){
    return this.httpClient.get(url, { observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));

    }));
  }
  public getProducts(){
    return this.httpClient.get(this.REST_API_SERVER);
  }
  parseLinkHeader(header :any) {
    if (header.length == 0) {
      return ;
    }

    let parts = header.split(',');
    let links : any={};
    parts.forEach( (p:string) => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });

    this.first  = links["first"];
    this.last   = links["last"];
    this.prev   = links["prev"];
    this.next   = links["next"]; 
  }

  /** POST: add a new hero to the database */
  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.REST_API_SERVER, product, httpOptions);  
  }
  deleteProduct(id: string): Observable<any> {
    console.log(id)
    return this.httpClient.delete(`${this.REST_API_SERVER}/${id}`)
}
 
}
