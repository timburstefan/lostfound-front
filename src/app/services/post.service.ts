import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostModel } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PostService {
  file: File | undefined;
  constructor(private http: HttpClient) {}

  createPost(post: any) {
    // create form data
    const formData = new FormData();
    formData.append('type', post.type);
    formData.append('name', post.name);
    formData.append('details', post.details);
    formData.append('contacts', post.contacts);
    formData.append('reward', post.reward);
    formData.append('latitude', post.lat);
    formData.append('longitude', post.lng);

    if (this.file) formData.append('image', this.file);

    return this.http.post(environment.API + '/api/posts/createPost', formData);
  }

  getLostPosts() {
    return this.http.get(environment.API + '/api/posts/getLostPosts');
  }
  getFoundPosts() {
    return this.http.get(environment.API + '/api/posts/getFoundPosts');
  }
  getPostById(id: string) {
    return this.http.get(environment.API + '/api/posts/getPost?uuid=' + id);
  }

  getPostLocation(latitude: number, longitude: number) {
    return this.http.get(
      environment.NOMINATIM_API +
        `/reverse?format=geocodejson&lat=${latitude}&lon=${longitude}`
    );
  }
  deletePost(id: string) {
    return this.http.delete(
      environment.API + '/api/posts/deletePost?uuid=' + id
    );
  }
}
