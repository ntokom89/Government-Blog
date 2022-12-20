import { Component, OnInit } from '@angular/core';
import { Subscription} from'rxjs'
import {PostServiceService} from '../post-service.service'

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css']
})
export class PostDisplayComponent implements OnInit {

  posts:{_id:string,id:string,name:string,description:string,content:string}[] = [];
  constructor(public postService:PostServiceService) { }

  private postsubscription!: Subscription;

 //Initially load the list of posts
 //https://www.positronx.io/mean-stack-tutorial-angular-crud-bootstrap/
  ngOnInit(): void {
    this.postService.getpost_service();
    this.postsubscription = this.postService.getUpdateListener()
    .subscribe((posts:{_id:string,id:string,name:string,description:string,content:string,__v:number}[]) => {

      this.posts = posts;
    });
  }

  ngOnDestroy(){
    this.postsubscription.unsubscribe();
  }
  //Method to delete a post using the id
  ondelete(postid: string){
    this.postService.deletepost_service(postid)
  }

}
