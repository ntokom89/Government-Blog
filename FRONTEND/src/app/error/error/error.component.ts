import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog"

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent  {
  //Constructor with Dialog with data string message as a parameter
  //https://material.angular.io/components/dialog/overview
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) { }



}