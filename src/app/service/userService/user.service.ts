import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  apiUrl = 'http://localhost:8081/api/v1/users'

  constructor(private http : HttpClient) { }


  getAllUsers(){
    return this.http.get(`${this.apiUrl}`);
  }
 
  AddUser(user : any){
    return this.http.post(`${this.apiUrl}/add-user`, user)  }

  deleteUser(id : Number){return this.http.delete(`${this.apiUrl}/${id}`) }

  updateUser(id : Number, user:any){
    return this.http.put(`${this.apiUrl}/${id}`,user)
  } 
  filterByUserName(name : String){
    return this.http.get(`${this.apiUrl}/specification?name=${name}`)
  } 

  FilterByCriteria(userNameFilter: string, emailFilter: string, dateFilter: string) {
    const data = {
        userName: userNameFilter,
        email: emailFilter,
        dateNaissance: dateFilter
      }

      return this.http.post(`${this.apiUrl}/list-by-criteria`,data)
  }
}
