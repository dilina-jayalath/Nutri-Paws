import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderPaymentsService {
  constructor(private http: HttpClient) {}

  url = environment.apiUrl;

  // add ctegory
  addCategory(formJson: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.url}category/setCategory`, formJson, {
      headers,
    });
  }

  //get All categories
  getAllCategories() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.url}category/getAllCategory`, { headers });
  }

  //update caregory

  updateCategory(categoryId: any, formJson: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put(
      `${this.url}category/updateCategory/${categoryId}`,
      formJson,
      { headers }
    );
  }

  //delete category
  deleteCate(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.delete(`${this.url}category/deleteCategory/${id}`, {
      headers,
    });
  }

  //get all users

  getAllusers() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.url}user/getAllUsers`, { headers });
  }

  // create user
  createUserLogin(customer: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.url}user/setUser`, customer, { headers });
  }

  //update user
  updateUser(id: any, payloadUser: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(`${this.url}user/editUser/${id}`, payloadUser, {
      headers,
    });
  }

  //delete User
  deleteUser(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.delete(`${this.url}user/deleteUser/${id}`, { headers });
  }

  //get all roles
  getAllroles() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.url}userrol/getAllUserRole`, { headers });
  }

  getAllSupItems() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.url}supplieritem/getAllSupplierItem`, {
      headers,
    });
  }

  //create role
  addrole(formJson: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.url}userrol/setUserRole`, formJson, {
      headers,
    });
  }

  //update Role
  updateRole(id: any, formJson: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put(`${this.url}userrol/editUserRole/${id}`, formJson, {
      headers,
    });
  }

  //delete user role
  deleteRole(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.delete(`${this.url}userrol/deleteUserRole/${id}`, {
      headers,
    });
  }

  // GET - FUNCTION OF GET CART ID
  getCartId(customer_id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.url}cart/getCartByCustomerId/${customer_id}`, {
      headers,
    });
  }

  // INSERT - FUNCTION OF CREATE CART
  createcart(payload: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.url}cart/insertCart`, payload, { headers });
  }

  // INSERT - FUNCTION OF ITEMS AD TO CART
  addToCart(payload: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.url}cartitem/setCartItem`, payload, {
      headers,
    });
  }

  //get AllOrders

  getAllOrders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}orders/getAllOrders`, {
      headers,
    });
  }

  getSupplierPayments(type: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.url}payment/getAllPaymentByTypeReport/${type}`,
      {
        headers,
      }
    );
  }

  getAllSupplierOrder() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}supplierorders/getAllOrders`, {
      headers,
    });
  }
}
