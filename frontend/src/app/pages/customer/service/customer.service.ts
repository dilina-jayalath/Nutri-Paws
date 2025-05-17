import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  // BASE URL
  url = environment.apiUrl;

  // GET - FUNCTION OF GET ALL ITEMS
  getAllItems() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}item/getAllItem`, { headers });
  }

  // GET - FUNCTION OF GET ALL CATEGORIES
  getAllCategories() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}category/getAllCategory`, { headers });
  }

  // GET - FUNCTION OF GET ALL ITEMS BY CATEGORIES
  getItemsByCategory(categoryId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}item/byCategory/${categoryId}`, {
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

  getPendingOrders(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}orders/getPendingOrdersByCusId/${id}`, {
      headers,
    });
  }

  getDeleverdOrders(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}orders/getDeleverdOrdersByCusId/${id}`, {
      headers,
    });
  }
}
