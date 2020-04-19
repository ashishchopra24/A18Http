import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Data} from './data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedPosts: Data[] = [];
  submitted = false;
  error = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.http
      .post(
        'https://postdata-65d56.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
        this.submitted = true;
      },  error => {
        this.error = error.message;
        console.log(error);
      });

  }

  onFetchPosts() {
    // Send Http request
    this.submitted = false;
    this.fetchPosts();
  }
  onClearPosts() {
    this.submitted = false;
    this.http.delete('https://postdata-65d56.firebaseio.com/posts.json').subscribe(() => {
      this.loadedPosts = [];
    });

  }

  private fetchPosts() {
    this.http
      .get(
        'https://postdata-65d56.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({'custom-header': 'hello'}),
          params: new HttpParams().set('print', 'pretty')
        }
      )
      .pipe(
        map(responseData => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({...responseData[key]});
            }
          }
          return postsArray;
        })
      )
      .subscribe(posts => {
        console.log(posts);
        this.loadedPosts = posts;
      }
      );

  }


  handleError() {
    this.error = null;
  }
}
