import { Post } from './Models/post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import * as jwt_decode from "jwt-decode";



declare var window: any;

function getParameterByName(name, url?) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var matterId = getParameterByName('matterId'); // "lorem"
var authtoken = getParameterByName('authtoken');

if (authtoken) {
  var decoded = jwt_decode(authtoken);
  var firmId = decoded.firmId;
}

console.log(decoded);


@Injectable({
  providedIn: 'root'
})
export class FormService {


  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  // private url: string = 'https://tranquil-caverns-63370.herokuapp.com';
  private url: string = '';
  public newUrl: string = "";
  constructor(private http: HttpClient) { }

  savePost(post: Post) {
    this.http.post<{message: string, post: Post}>(this.url + '/api/posts',
    {post: post, matterId: matterId, authtoken:authtoken, firmId: firmId})
      .subscribe((resp) => {
        console.log(resp.message);
        console.log(resp.post);
        this.posts.push(resp.post);
        this.postsUpdated.next([...this.posts]);
      });
      // this.newUrl = '4d://json=ewphY3Rpb246ICdSZWxvYWRMZWRnZXInLApsZWRnZXJzVG9SZWxvYWQ6IFsyXSwKY2xvc2U6J2ZhbHNlJywKfQ==';
      // console.log("Redirecting to", this.newUrl);
      // alert("Redirecting to" + this.newUrl);
      // try {
      //   window.location.href = this.newUrl;
      //   } catch(error) {
      //     if (this.newUrl === '4d://json=ewphY3Rpb246ICdSZWxvYWRMZWRnZXInLApsZWRnZXJzVG9SZWxvYWQ6IFsyXSwKY2xvc2U6J2ZhbHNlJywKfQ==') {
      //       alert("tried to refresh.");
      //     }
      //   }
  }
  getPostUpdateListener() {

    return this.postsUpdated.asObservable();
  }
  getPosts() {
    this.http.post<{message: string, posts: Post[]}>(this.url + '/api/posts/live', {matterId: matterId})
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
        this.getPostUpdateListener().subscribe(posts => console.log(posts));
      });
  }
  deletePost(id) {
    this.http.delete<{message: string}>(this.url + '/api/posts/' + id)
    .subscribe(responseData => {
      const updatedPosts = this.posts.filter(post => post.Id !== id);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
  updatePost(post) {
    this.http.put<{message: string}>(this.url + '/api/posts', {post: post, matterId: matterId})
      .subscribe(responseData => {
        console.log(responseData);
          const updatedItems = [...this.posts];
          const oldItemIndex = updatedItems.findIndex(p => p.Id == post.Id);
          updatedItems[oldItemIndex] = post;
          this.posts = updatedItems;
          this.postsUpdated.next([...this.posts]);

      });
  }
}
