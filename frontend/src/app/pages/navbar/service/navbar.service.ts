import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  constructor(private http: HttpClient) {}

  // BASE URL
  url = environment.apiUrl;

  checkItems(id:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}supplierorders/getOrdersBySupIdWisthSt/${id}`, {
      headers,
    });
  }
}
