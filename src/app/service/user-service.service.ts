import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor( private http:HttpClient) { }
  getUsers(){
    return this.http.get("http://localhost:4000/users");
  }

  loginid(user){
    console.log(user.useremail );
    return this.http.post("http://localhost:4000/login", {"user":user});
    
  }
  newUsers(user){
    console.log(user);
    return this.http.post("http://localhost:4000/user", {"user":user}).subscribe(data=>{
      console.log(data);
    })
  }
}
