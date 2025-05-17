import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyInfoService {
  constructor(private http: HttpClient) {}

  // BASE URL
  url = environment.apiUrl;

  getAllItems() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.url}companyinfor/getCompanyDeatails`, {
      headers,
    });
  }
}
