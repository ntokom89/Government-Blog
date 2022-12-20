import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import * as e from 'express';
import {AuthServiceService} from '../../auth-service.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  //Constructor that checks if the router url is rather login or sign up and has parameters of authservice and router
  constructor(public authservice : AuthServiceService, private router: Router) {
    if (this.router.url == '/login') {
      this.optionS = 'Login';
    }else{
      this.optionS = 'SignUp';
    }
   }
  //Variable that gets the router url
  option: string = this.router.url
  optionS: string = ''
  signupT : string = 'Signup'
  ngOnInit(): void {
  }
  //Method to check if the user is signing up or logging in
  onlogin(loginform: NgForm){
    if(loginform.invalid){
      return;
    }

    if(this.option == '/login'){
      this.authservice.login(loginform.value.enteredusername, loginform.value.enteredpassword)

    }else{
      this.authservice.signup(loginform.value.enteredusername, loginform.value.enteredpassword)

    }
  }
}
