import { FormService } from './../form.service';
import { Component, OnInit,OnChanges } from '@angular/core';
import { Post } from '../Models/post.model';
import * as moment from "moment";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit,OnChanges {


  posts: Post[] = [];
  postsDisplayOnTop: Post[] = [];
  postValCount = 0;
  post: Post;
  constructor(private service: FormService) { }

  ngOnInit() {
    this.post = new Post();
    this.service.getPosts();
    this.service.getPostUpdateListener()
      .subscribe(posts => {
        this.posts = posts;
        this.postsDisplayOnTop = this.posts;
      });
  }
  submit(val: Post) {
    this.post.clientName = '';
    this.post.dueDate = '';
    this.post.servedDate = '';

    if(this.post.byCtorder == undefined) {
      this.post.byCtorder = false;
    }

    if(this.post.srvdOnDef == undefined) {
      this.post.srvdOnDef = false;
    }

    if(this.post.srvdOnPlt == undefined) {
      this.post.srvdOnPlt = false;
    }

    if(this.post.caseStatus == undefined) {
      this.post.caseStatus = false;
    }

    if(this.post.clientStatus == undefined) {
      this.post.clientStatus = false;
    }

    if (this.post.dateServed == undefined) {
      this.post.dateServed = '';
    } else {
      this.post.dateServed = moment(this.post.dateServed).toISOString();
    }
    if (this.post.due == undefined) {
      this.post.due = '';
    } else {
      this.post.due = moment(this.post.due).toISOString().slice(0, 19);
    }
    if (this.post.answered == undefined) {
      this.post.answered = '';
    } else {
      this.post.answered = moment(this.post.answered).toISOString();
    }
    if (this.post.ltSent == undefined) {
      this.post.ltSent = '';
    } else {
      this.post.ltSent = moment(this.post.ltSent).toISOString();
    }

    if (this.post.toCltforCert == undefined) {
      this.post.toCltforCert = '';
    } else {
      this.post.toCltforCert = moment(this.post.toCltforCert).toISOString();
    }

    if (this.post.certReceived == undefined) {
      this.post.certReceived = '';
    } else {
      this.post.certReceived = moment(this.post.certReceived).toISOString();
    }

    console.log(this.post);
    if(this.postValCount > 0) {
      let pst = new Post(this.post.Id,this.post.clientName,this.post.discoveryType,this.post.dateServed, this.post.byCtorder, this.post.dueDate, this.post.directedToParty, this.post.directedTo, this.post.servedBy, this.post.due, this.post.toCltforCert, this.post.servedDate, this.post.discNotes, this.post.caseStatus, this.post.clientStatus,this.post.answered,this.post.srvdOnDef, this.post.srvdOnPlt, this.post.ltSent, this.post.certReceived) ;
      this.service.updatePost(pst);
      this.post = new Post();
    } else {
      let pst = new Post(null,this.post.clientName,this.post.discoveryType,this.post.dateServed, this.post.byCtorder, this.post.dueDate, this.post.directedToParty, this.post.directedTo, this.post.servedBy, this.post.due, this.post.toCltforCert, this.post.servedDate, this.post.discNotes, this.post.caseStatus, this.post.clientStatus,this.post.answered,this.post.srvdOnDef, this.post.srvdOnPlt, this.post.ltSent, this.post.certReceived) ;
      this.service.savePost(pst);
      this.post = new Post();
    }
  }

  delete(id) {
    this.service.deletePost(id);
  }

  ngOnChanges(changes) {
    this.service.getPosts();
    this.service.getPostUpdateListener()
      .subscribe(posts => {
        this.posts = posts;
        this.postsDisplayOnTop = this.posts;
      });
  }

  rightBtnClick() {
  if (this.posts.length > this.postValCount) {
      this.postValCount++;
      this.post = this.posts[this.postValCount];
      this.post.dateServed = moment(this.post.dateServed);

      this.post.due = moment(this.post.due);
      this.post.answered = moment(this.post.answered);
      this.post.ltSent = moment(this.post.ltSent);
      this.post.toCltforCert = moment(this.post.toCltforCert);
      this.post.certReceived = moment(this.post.certReceived);
    }
  }

  leftBtnClick() {
  console.log(this.posts.length, this.postValCount);
    if ((this.postValCount) > 0) {
    this.postValCount--;
    this.post = this.posts[this.postValCount];
    this.post.dateServed = moment(this.post.dateServed);
    this.post.due = moment(this.post.due);
    this.post.answered = moment(this.post.answered);
    this.post.ltSent = moment(this.post.ltSent);
    this.post.toCltforCert = moment(this.post.toCltforCert);
    this.post.certReceived = moment(this.post.certReceived);
    }
  }

  resetForm() {
    this.postValCount = 0;
    this.post = new Post();
  }
}
