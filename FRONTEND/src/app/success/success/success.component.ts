import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog"
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent  {

  //Constructor with Dialog with data string message as a parameter
  //https://material.angular.io/components/dialog/overview
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) { }

}
