import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import{ HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog'


import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { PostDisplayComponent } from './post/post-display/post-display.component';
import { LoginComponentComponent } from './auth/login/login-component/login-component.component';
import {  AuthInterceptorInterceptor } from './auth/auth-interceptor.interceptor'
import {AppRoutingModule} from './app-routing.module';
import { ErrorComponent } from './error/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ErrorinterceptorInterceptor} from './error/errorinterceptor.interceptor';
import { SuccessComponent } from './success/success/success.component'


@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    PostDisplayComponent,
    LoginComponentComponent,
    ErrorComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass :AuthInterceptorInterceptor,multi:true},
    {provide: HTTP_INTERCEPTORS, useClass :ErrorinterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
