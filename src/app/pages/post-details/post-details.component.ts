import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { LngLat, Map, Marker, NavigationControl } from 'maplibre-gl';
import { PostModel } from 'src/app/models/models';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;
  map!: Map;
  imageUrl = '';
  postData: PostModel = {
    type: '',
    name: '',
    contacts: '',
    details: '',
    reward: '',
  };
  post: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.initData();
    this.route.params.subscribe((data) => {
      this.postService.getPostById(data['id']).subscribe((data: any) => {
        this.post = data;
        this.setData(data);
        console.log(data);
      });
    });
  }
  initData() {
    this.postData.type = '';
    this.postData.name = '';
    this.postData.contacts = '';
    this.postData.details = '';
    this.postData.reward = '';
  }
  setData(data: any) {
    this.imageUrl = data.post.image;
    this.postData.name = data.post.name;
    this.postData.type = data.post.type;
    this.postData.contacts = data.post.contacts;
    this.postData.details = data.post.details;
    this.postData.reward = data.post.reward;
  }
}
