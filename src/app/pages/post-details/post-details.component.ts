import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { LngLat, Map, Marker, NavigationControl } from 'maplibre-gl';
import { PostModel } from 'src/app/models/models';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;
  user = JSON.parse(localStorage.getItem('user')!);
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
  matchingPosts: any[] = [];
  nearPosts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private generalService: GeneralService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initData();
    this.route.params.subscribe((data) => {
      this.postService.getPostById(data['id']).subscribe((data: any) => {
        console.log(data);
        this.post = data;
        this.setData(data);
        this.addMarkerToMap();
        this.sortPosts();
        console.log('Mathicng posts');
        console.log(this.matchingPosts);
      });
    });
  }
  ngAfterViewInit() {
    const initialState = { lng: 28.406, lat: 47.082, zoom: 6.5 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets/style.json?key=57fnrQKKNWkgYkrN1yby`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });
    this.map.addControl(new NavigationControl(), 'top-right');
  }
  addMarkerToMap() {
    if (
      this.post.post.geographicalLocation.longitude &&
      this.post.post.geographicalLocation.latitude
    ) {
      let marker = new Marker()
        .setLngLat([
          this.post.post.geographicalLocation.longitude,
          this.post.post.geographicalLocation.latitude,
        ])
        .addTo(this.map);
    }
    this.map.flyTo({
      center: [
        this.post.post.geographicalLocation.longitude,
        this.post.post.geographicalLocation.latitude,
      ],
      zoom: 15,
      speed: 0.4,
    });
  }
  isThePostOwner(post: any) {
    return post.post.user.id === this.user.id;
  }
  sortPosts() {
    this.nearPosts = this.post.nearPosts.sort(
      (a: any, b: any) => a.distance - b.distance
    );
    this.matchingPosts = this.post.matchingPosts.sort(
      (a: any, b: any) =>
        b.numberIntersectedKeywords - a.numberIntersectedKeywords
    );
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe((data) => {
      this.generalService.openSnackBar('Post deleted successfully');
      this.router.navigate(['/home']);
    });
  }
  initData() {
    this.postData.type = '';
    this.postData.name = '';
    this.postData.contacts = '';
    this.postData.details = '';
    this.postData.reward = '';
    this.postData.status = '';
    this.postData.createdDate = '';
  }
  setData(data: any) {
    this.imageUrl = data.post.image;
    this.postData.name = data.post.name;
    this.postData.type = data.post.type;
    this.postData.contacts = data.post.contacts;
    this.postData.details = data.post.details;
    this.postData.reward = data.post.reward;
    this.postData.status = data.post.status;
    this.postData.createdDate = data.post.createdDate;
  }
}
