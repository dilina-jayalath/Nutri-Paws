import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { SupplierItem } from '../supplier-view/supplier-view.component';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  // BASE URL
  url = environment.apiUrl;

  getAllCategories() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`${this.url}category/getAllCategory`, {
      headers,
    });
  }

  uploadItem(jsonData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.url}supplieritem/setSupplierItem`, jsonData, {
      headers,
    });
  }

  getCartId(customer_id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.url}cart/getCartByCustomerId/${customer_id}`, {
      headers,
    });
  }

  createcart(payload: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.url}cart/insertCart`, payload, { headers });
  }
  createSuplierorder(payload: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.url}supplierorders/setSupOrders`, payload, {
      headers,
    });
  }

  addToCart(payload: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.url}cartitem/setCartItem`, payload, {
      headers,
    });
  }

  getSupplierDetails(payload: any) {
    console.log(payload);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(
      `${this.url}supplier/getSuppliersByUserId/${payload}`,
      {
        headers,
      }
    );
  }

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
    return this.http.post(`${this.url}supplier/setSuppliers`, customer, {
      headers,
    });
  }

  // POST - FUNCTION OF SINGUP CUSTOMER
  deleteUser(customer: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.url}supplier/deleteSuppliers`, customer, {
      headers,
    });
  }

  getSupplierItems(supplierId: any) {
    console.log('api end point ' + supplierId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<SupplierItem[]>(
      `${this.url}supplieritem/getAllSupplierItemBySupId/${supplierId}`,
      { headers }
    );
  }

  updateItem(itemId: number, data: any) {
    console.log('item id ' + itemId + ' - data -' + data);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(
      `${this.url}supplieritem/updateSupplier/${itemId}`,
      data,
      { headers }
    );
  }

  deleteItem(itemId: number) {
    return this.http.delete(`${this.url}supplieritem/deleteSupplier/${itemId}`);
  }

  createorder(insertData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.url}orders/createorder`, insertData, {
      headers,
    });
  }

  getPendingOrders(id: any, status: String) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.url}supplierorders/getReturnOrdersBySupId/${id}/${status}`,
      {
        headers,
      }
    );
  }
}
