import { LngLat } from 'maplibre-gl';

export interface LoginModel {
  username: string;
  password: string;
}

export interface RegisterModel {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface PostModel {
  type: string;
  name: string;
  contacts: string;
  details: string;
  reward: string;
  lat: number;
  long: number;
}

export interface FoundItems {
  title: string;
  description: string;
  location: LngLat;
}
