import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionLoginService {
  baseUrl="http://localhost:8081/api/v1/auth"
  constructor(private httpClient: HttpClient) { }

  login(email:string, password: string){
    const loginData = {
          email: email ,
          password: password
    }      
    return this.httpClient.post(`${this.baseUrl}/authenticate`,loginData)
  }

  register(userform : any){
    return this.httpClient.post(`${this.baseUrl}/register`,userform)
  }
}
