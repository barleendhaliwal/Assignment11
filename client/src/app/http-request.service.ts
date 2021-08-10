import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model'
import {environment} from '../environments/environment'
type Response = {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  baseURL = environment.BASE_URL;
  constructor(private http: HttpClient) {

  }
  get() {
    return this.http.get<User[]>(this.baseURL)

    //can't do this as get method is async 
    //.subscribe(data => return data)
  }
  delete(id: number) {
    return this.http.delete<Response>(this.baseURL + `${id}`)
  }

  edit(id: number, data: User) {
    let body = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      role: data.role,
      address: data.address,
      customerName: data.customerName
    }
    return this.http.put<Response>(this.baseURL + `${id}`, body)
  }
  post(data: User) {
    let body = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      role: data.role,
      address: data.address,
      customerName: data.customerName
    }
    return this.http.post<Response>(this.baseURL, body);
  }
}
