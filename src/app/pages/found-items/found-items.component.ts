import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { foundItems } from './foundItems';

@Component({
  selector: 'app-found-items',
  templateUrl: './found-items.component.html',
  styleUrls: ['./found-items.component.scss'],
})
export class FoundItemsComponent implements OnInit {
  foundItems: any;

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.postService.getFoundPosts().subscribe((posts) => {
      this.foundItems = posts;
      console.log(this.foundItems);
      console.log(this.userService.user);
    });
  }
}
