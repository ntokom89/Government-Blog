import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable()
//A class that implements the intercept method to get the token and apply it to authorization bearer to the request.
//https://indepth.dev/tutorials/angular/authentication-token-interceptor
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private authservice: AuthServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const authToken = this.authservice.getToken();
    const authRequest = request.clone({headers:request.headers.set("Authorization", "Bearer " + authToken)});
    return next.handle(authRequest);
  }
}
