import { Component, OnInit } from '@angular/core';
import { DatabaseBarService} from '../_services/database-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users:any
  selectedUserId = 1;
  comments:any;
  commentsArray:any;
  editCommentActive = false;
  constructor(private dbService: DatabaseBarService) {}
  ngOnInit(): void {
    this.getUsers();
    this.getComments();
  }

  getUsers() {
    this.dbService.getUsers().subscribe(data => {
      this.users = data;
    },
    err => {
      throw err;
    });
  }

  getComments() {


    let localStoragecomments = window.localStorage.getItem('comments');
    if(localStoragecomments){
      this.comments = JSON.parse(localStoragecomments);
      return
    }

    this.dbService.getComments().subscribe(data => {
      this.comments = data;
      //  this.comments.sort(function compare(a:any, b:any) {
      //   return new Date(a.createdAt) - new Date(b.createdAt);
      // });
      //this.showComments();

    },
    err => {
      throw err;
    });
  }

  onChange(user:any){
    this.selectedUserId = Number(user.target.value);
  }

  dateFunc(time:any){
    let currentDate = new Date("2018-07-15T11:01:00.000Z");
    time = new Date(time);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(time.getFullYear(), time.getMonth(), time.getDate()) ) /(-1000 * 60 * 60));

  }

  nameFunc(owenrId:any){
    let user = this.users.find((x:any) => x.id === owenrId);
    return user.displayName;
  }

  submitComment(textvalue:string){
    let obj = {
      "id": 15,
      "parentCommentId": 6,
      "ownerId": this.selectedUserId,
      "txt": textvalue,
      "createdAt": new Date(),
      "deletedAt": null
    }
    this.comments.push(obj);
    window.localStorage.setItem('comments', JSON.stringify(this.comments));

  }

  editComment(comment:any){
    this.editCommentActive = true;
  }

  deleteComment(comment:any){
  }

  // showComments(){
  //   let commentsbyOwnerId =  this.comments.filter((x:any) => x.ownerId === this.selectedUserId);
  //   let commentsbyparentCommentId =  this.comments.filter((x:any) => x.parentCommentId === this.selectedUserId);
  //   this.commentsArray = [...commentsbyOwnerId, ...commentsbyparentCommentId];
  // }

}
