import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/models';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  recentFound: PostModel[] = [];
  recentLost: PostModel[] = [];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getRecentFoundPosts();
    this.getRecentLostPosts();
  }

  getRecentFoundPosts() {
    this.postService.getFoundPosts().subscribe((data: any) => {
      this.recentFound = data.map((item: { post: any }) => item.post);
    });
  }

  getRecentLostPosts() {
    this.postService.getLostPosts().subscribe((data: any) => {
      this.recentLost = data.map((item: { post: any }) => item.post);
    });
  }
}
