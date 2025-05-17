import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  // BASE URL
  url = environment.apiUrl;

  // GET ALL CATEGORIES
  getAllCategories() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`${this.url}category/getAllCategory`, {
      headers,
    });
  }

  // GET ALL ITEMS
  getAllItems() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}item/getAllItem`, { headers });
  }

  // CHECK ITEM STOCK >50
  checkItems() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}item/getItemAlert`, {
      headers,
    });
  }

  // DELETE ITEM
  deleteItem(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(`${this.url}item/deleteItem/${id}`, {
      headers,
    });
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

  // UPDATE ITEM
  updateItem(id: any, data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(`${this.url}item/updateItem/${id}`, data, {
      headers,
    });
  }

  // UPDATE ORDER STATUS
  updateOrderStatus(id: any, jsonData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(`${this.url}orders/updateOrder/${id}`, jsonData, {
      headers,
    });
  }

  updatePaymentsStatus(id: any, jsonData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(`${this.url}payment/updatePyments/${id}`, jsonData, {
      headers,
    });
  }

  updateSupOrderStatus(id: any, jsonData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(
      `${this.url}supplierorders/updateOrder/${id}`,
      jsonData,
      {
        headers,
      }
    );
  }

  // UPDATE CUSTOMER ORDER STATUS
  updateCustomerOrderStatus(id: any, jsonData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(
      `${this.url}supplierorders/updateOrder/${id}`,
      jsonData,
      {
        headers,
      }
    );
  }

  // GET ALL ORDERS
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

  // GET ALL CUSTOMER ORDERS
  getAllCustomerOrders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}supplierorders/getAllOrders`, {
      headers,
    });
  }

  // GET ALL ITEMS BY CUSTOMER ORDERS
  getCustomerOrderitems(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}supplierorders/getAllItemsByOrder/${id}`, {
      headers,
    });
  }

  // GET ALL ITEMS BY CUSTOMER ORDERS BY USERID
  getCustomerOrderItemsByUserId(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}orders/getOrdersByCusId/${id}`, {
      headers,
    });
  }

  getSupplierOrderItemsByUserId(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}supplierorders/getOrdersBySupId/${id}`, {
      headers,
    });
  }

  getAllSupplierOrder() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}supplierorders/getAllOrders`, {
      headers,
    });
  }

  //GET ORDER ITEMS
  getOrderitems(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}orders/getAllItemsByOrder/${id}`, {
      headers,
    });
  }

  getSupOrderitems(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.url}supplierorders/getAllSupplierItemByOrderId/${id}`,
      {
        headers,
      }
    );
  }

  // ADD ITEM TO INVENTORY
  uploadItem(jsonData: any) {
    console.log('set item details -' + jsonData);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.url}item/setItem`, jsonData, { headers });
  }

  // FOR REPORTS -----------------

  // GET CURRENT INVENTRY LEVEL
  getAllCurrentInventry() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}item/getAllItem`, {
      headers,
    });
  }

  // GET ORDER DETAILS MONTHLY WISE
  getOrdersByMonth() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}orders/getMonthWiseOrders`, {
      headers,
    });
  }
}
