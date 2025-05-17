import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartDialogService {
  constructor(private http: HttpClient) {}

  // BASE URL
  url = environment.apiUrl;

  // GET - FUNCTION OF GET ALL ITEMS
  getAllCartItems(customer_id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.url}cartitem/getAllcartItemByCustomerId/${customer_id}`,
      { headers }
    );
  }

  removeCartItem(cart_item_id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(
      `${this.url}cartitem/deleteCartItem/${cart_item_id}`,
      { headers }
    );
  }

  createorder(insertData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.url}orders/createorder`, insertData, {
      headers,
    });
  }
}
