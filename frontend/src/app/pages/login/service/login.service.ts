import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(private http: HttpClient) {}
 
   // BASE URL
   url = environment.apiUrl;

   login(requestBody: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    return this.http.post(`${this.url}user/loginUser`, requestBody, { headers }); 
   }
}
