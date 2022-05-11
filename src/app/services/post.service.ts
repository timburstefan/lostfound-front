import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}
  createPost(post: any) {
    return this.http.post<any>(environment.API + '/api/posts/createPost', {
      type: post.selectedValue,
      name: post.name,
      details: post.details,
    });
  }
}
