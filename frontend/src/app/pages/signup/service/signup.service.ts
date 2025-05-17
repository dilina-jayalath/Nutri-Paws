import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  // BASE URL
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // POST - FUNCTION OF SINGUP CUSTOMER
  createUserLogin(customer: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.url}user/setUser`, customer, { headers });
  }

  // POST - FUNCTION OF SINGUP CUSTOMER
  signupCustomer(customer: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.url}customer/setCustomer`, customer, { headers });
  }

  // POST - FUNCTION OF SINGUP CUSTOMER
  deleteUser(customer: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.url}user/deleteUser`, customer, { headers });
  }
}
