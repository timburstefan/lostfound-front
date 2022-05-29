import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LngLat, Map, Marker, NavigationControl } from 'maplibre-gl';
import { Subscription } from 'rxjs';
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
  coordinates!: LngLat;
  postTypes = ['Lost', 'Found'];
  markerLocation: string = '';

  @Input()
  requiredFileType: string | undefined;

  fileName = '';
  uploadProgress!: number | null;
  uploadSub!: Subscription | null;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private generalService: GeneralServce,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.createPostForm = this.fb.group({
      type: ['', Validators.required],
      name: '',
      age: '',
      contacts: '',
      details: '',
      reward: '',
      lat: 0,
      lng: 0,
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
        this.coordinates = event.lngLat;
        this.getLocationByLatLong(this.coordinates.lat, this.coordinates.lng);
        this.marker.on('dragend', () => {
          this.coordinates = this.marker.getLngLat();
          this.getLocationByLatLong(this.coordinates.lat, this.coordinates.lng);
          console.log(this.coordinates);
        });
        this.marker.on('click', () => this.marker.remove());
      }
      console.log(this.marker);
    });
  }

  onSubmit() {
    this.createPostForm.patchValue({
      lat: this.coordinates.lat,
      lng: this.coordinates.lng,
    });
    this.postService.createPost(this.createPostForm.value).subscribe(
      () => {
        this.generalService.openSnackBar('Post created');
        location.reload();
      },
      () => {
        this.generalService.openSnackBar('Error creating post');
      }
    );
    this.postService.file = undefined;
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

  onFileSelected(event: any) {
    this.postService.file = event.target.files[0];
    this.fileName = this.postService.file!.name;
  }

  cancelUpload() {
    this.uploadSub!.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
  getLocationByLatLong(latitude: number, longitude: number) {
    this.postService
      .getPostLocation(latitude, longitude)
      .subscribe(
        (data: any) =>
          (this.markerLocation = data.features[0].properties.geocoding.label)
      );
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
