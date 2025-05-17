import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileComponentServiceService {
  // BASE URL
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // GET - FUNCTION OF GET ALL ITEMS
  getCustomerByCusId(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}customer/getCustomerByCusId/${id}`, {
      headers,
    });
  }
  // DELETE - FUNCTION OF DELETE CUSTOMER ACCOUNT
  deleteCustomerAcc(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(`${this.url}customer/deleteCustomer/${id}`, {
      headers,
    });
  }
  // DELETE - FUNCTION OF DELETE CUSTOMER ACCOUNT
  deleteAcc(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(`${this.url}user/deleteUser/${id}`, { headers });
  }

  // UPDATE - FUNCTION OF UPDATE USER DETAILS
  updateUser(userUpdate: any, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put(`${this.url}user/editUser/${id}`, userUpdate, {
      headers,
    });
  }
  // UPDATE - FUNCTION OF UPDATE CUSTOMER DETAILS
  updateCustomer(userUpdate: any, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put(`${this.url}customer/updateCustomer/${id}`, userUpdate, {
      headers,
    });
  }
}
