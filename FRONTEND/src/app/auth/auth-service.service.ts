import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {SuccessComponent} from '../success/success/success.component';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private token!: string;

  constructor(private http: HttpClient, private dialog: MatDialog) {

   }
   //Method to sign up a new user
   //https://www.positronx.io/mean-stack-tutorial-angular-crud-bootstrap/
   signup(username:string, userpassword:string) {
    this.http.post<{message: string}>('https://localhost:3000/api/users/signup',{username:username, password:userpassword})
    .subscribe(res => {
      this.dialog.open(SuccessComponent, {data:{message:res.message}})
    });
   }

   //Method to login the user 
   //https://www.bezkoder.com/mean-stack-authentication-angular-8/
   login(username:string,userpassword:string) {

    this.http.post<{token: string, message: string}>('https://localhost:3000/api/users/login',{username:username, password:userpassword})
    .subscribe(res => {
      const message = res.message
      const token = res.token;
      this.token = token;
      this.dialog.open(SuccessComponent, {data:{message:res.message}})
    });
   }

   getToken() {
    return this.token;
   }
}
