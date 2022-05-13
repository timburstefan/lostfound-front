import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LngLat, Map, Marker, NavigationControl } from 'maplibre-gl';
import { GeneralServce } from 'src/app/services/general.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;
  createPostForm!: FormGroup;
  map!: Map;
  marker!: Marker;
  coordinates = new LngLat(0, 0);
  postTypes = ['Lost', 'Found'];
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private generalService: GeneralServce
  ) {}

  ngOnInit(): void {
    this.createPostForm = this.fb.group({
      selectedValue: ['', Validators.required],
      name: '',
      age: '',
      contacts: '',
      details: '',
      reward: '',
    });
  }
  ngAfterViewInit() {
    const initialState = { lng: 28.406, lat: 47.082, zoom: 7 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets/style.json?key=57fnrQKKNWkgYkrN1yby`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });
    this.map.addControl(new NavigationControl(), 'top-right');
    this.addMarkerToMap();
  }
  addMarkerToMap() {
    this.map?.on('click', (event) => {
      if (this.marker == undefined) {
        this.marker = this.addNewMarker(event.lngLat, { className: 'marker' });
        this.marker.on(
          'dragend',
          () => (this.coordinates = this.marker.getLngLat())
        );
        this.marker.on('click', () => this.marker.remove());
      }
      console.log(this.marker);
    });
  }

  onSubmit() {
    this.postService.createPost(this.createPostForm.value).subscribe(
      (data) => {
        console.log('postare creata');
      },
      (error) => {
        this.generalService.openSnackBar('Post created');
      }
    );
  }
  public addNewMarker(
    lngLat: maplibregl.LngLatLike,
    options: {
      className: string;
    },
    listener?: () => void
  ) {
    const el = document.createElement('div');
    el.className = options.className;

    if (listener) {
      el.addEventListener('click', listener);
    }

    return new Marker({
      draggable: true,
      offset: [0, -30 / 2],
    })
      .setLngLat(lngLat)
      .addTo(this.map);
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
