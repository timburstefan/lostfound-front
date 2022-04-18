import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel, RegisterModel } from 'src/app/models/userModels';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  login(userModel: LoginModel) {
    this.httpClient.post(environment.API, userModel);
  }
  register(userModel: RegisterModel) {
    this.httpClient.post(environment.API, {
      username: userModel.username,
      password: userModel.password,
    });
  }
}
