import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {SuccessComponent} from '../success/success/success.component';


@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private postdisplay:{_id:string,id:string,name:string,description:string,content:string,__v:number}[] = [];
  private updatepostdisplay = new Subject<{_id:string,id:string,name:string,description:string,content:string,__v:number}[]>();
  constructor(private http: HttpClient, private dialog: MatDialog) {
    
   }
   //Method to add a new post
   //https://www.positronx.io/mean-stack-tutorial-angular-crud-bootstrap/
   addpost_service(pid: string, pname: string, pdescription: string, pcontent: string) {
    this.http.post<{message: string}>('https://localhost:3000/api/posts',{id:pid, name:pname, description:pdescription, content:pcontent})
    .subscribe(response => {
      console.log(response);
      this.dialog.open(SuccessComponent, {data:{message:response.message}})
    })
   }
   //method to get a list of posts
   //https://www.positronx.io/mean-stack-tutorial-angular-crud-bootstrap/
   getpost_service(){
    this.http.get<{message: string,posts:any}>('https://localhost:3000/api/posts')
    .subscribe((thepost) =>{
      this.postdisplay = thepost.posts;
      this.updatepostdisplay.next([...this.postdisplay]);
    })
  }
  //Method to delete the post
  //https://www.positronx.io/mean-stack-tutorial-angular-crud-bootstrap/` 
  deletepost_service(postid: string){
    this.http.delete('https://localhost:3000/api/posts/' + postid)
    .subscribe(() =>{
      const updatedpostsdeleted = this.postdisplay.filter(post=> post._id!== postid)
      this.postdisplay = updatedpostsdeleted;
      this.updatepostdisplay.next([...this.postdisplay]);
    })
  }

  getUpdateListener(){
    return this.updatepostdisplay.asObservable();
  }
}
