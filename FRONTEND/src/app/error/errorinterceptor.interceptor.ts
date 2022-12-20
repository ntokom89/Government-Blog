import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {throwError } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {catchError} from 'rxjs/operators';
import {ErrorComponent} from './error/error.component';

@Injectable()
//Interceptor class that catches errors that occur when request has been made
//https://stackoverflow.com/questions/53361348/how-to-catch-the-successful-request-using-httpclient-interceptor
export class ErrorinterceptorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) =>{
        let errorMessage = "An Unknown Error has occured";
        if(error.error.message){
          errorMessage = error.error.message;
        }
        this.dialog.open(ErrorComponent, {data:{message:errorMessage}})
        return throwError(() => error);
      })
    );
  }
}
