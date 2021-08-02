import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model'


// type UserEdit = {


//   firstName: string;
//   middleName?: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   role: string;
//   address: string;
//   customerName: string;
// }
type Response = {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  baseURL = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) {

  }

  log() {
    console.log("service works!!!!")
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
