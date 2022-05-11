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

export interface FoundItems {
  title: string;
  description: string;
  location: LngLat;
}
