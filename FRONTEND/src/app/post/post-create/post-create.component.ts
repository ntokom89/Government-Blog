import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {PostServiceService} from '../post-service.service';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postservice: PostServiceService) { }

  ngOnInit(): void {
  }
  //Method to add a post
  //https://www.positronx.io/mean-stack-tutorial-angular-crud-bootstrap/
  onAddPost(postform : NgForm){
    if(postform.invalid){
      alert('Invalid')
      return
    }

    this.postservice.addpost_service(postform.value.enteredID,postform.value.enteredName,postform.value.enteredDescription,postform.value.enteredContent)
    postform.resetForm()
    alert('Post is added and form is : ' +postform.value.enteredName)
  }

}
