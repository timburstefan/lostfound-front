import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}
  createPost(post: any) {
    // create form data
    const formData = new FormData();
    formData.append('type', post.selectedValue);
    formData.append('name', post.name);
    formData.append('details', post.details);

    // if (post.image) {
    //   formData.append('image', post.image);
    // }
    
    return this.http.post(environment.API + '/api/posts/createPost', formData);
  }
}
