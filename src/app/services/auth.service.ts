import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { LoginModel, RegisterModel } from 'src/app/models/userModels';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  login(userModel: LoginModel) {
    return this.httpClient
      .post<LoginModel>(environment.API + '/api/auth/signin', userModel)
      .pipe(
        map((res: any) => {
          localStorage.setItem('currentUserToken', res.token || '');
          return res;
        })
      );
  }
  register(userModel: RegisterModel) {
    return this.httpClient.post<any>(
      environment.API + '/api/auth/signup',
      {
        firstName: userModel.firstName,
        lastName: userModel.lastName,
        email: userModel.email,
        username: userModel.username,
        password: userModel.password,
      },
      { observe: 'response' }
    );
  }
}
