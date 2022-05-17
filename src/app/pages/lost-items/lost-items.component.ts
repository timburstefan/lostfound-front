import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { foundItems } from '../found-items/foundItems';

@Component({
  selector: 'app-lost-items',
  templateUrl: './lost-items.component.html',
  styleUrls: ['./lost-items.component.scss'],
})
export class LostItemsComponent implements OnInit {
  lostItems: any;
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getLostPosts().subscribe((posts) => {
      this.lostItems = posts;
      console.log(this.lostItems);
    });
  }
}
