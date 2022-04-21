import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel, RegisterModel } from 'src/app/models/userModels';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  login(userModel: LoginModel) {
    return this.httpClient.post<LoginModel>(
      environment.MOCK_API + '/auth/login',
      userModel
    );
  }
  register(userModel: RegisterModel) {
    return this.httpClient.post<RegisterModel>(
      environment.API + '/api/auth/signup',
      {
        username: userModel.username,
        password: userModel.password,
      }
    );
  }
}
