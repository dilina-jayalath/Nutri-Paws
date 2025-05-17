import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  // BASE URL
  url = environment.apiUrl;

  // GET - API OF GET TASK LIST
  getAllTask(){
    return this.http.get(`${this.url}/getAll`);
  }

  // POST - API OF SAVE TASK
  saveTask(task:{title: string, description:string}){
    return this.http.post(`${this.url}/setTask`,task);
  }

  // PUT - API OF UPDATE TASK STATUS
  updateTask(id:number,task:{id:number,status:string}){
    return this.http.put(`${this.url}/updateTask/${id}`,task);
  }
}
