import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/models';

@Injectable({ providedIn: 'root' })
export class UserService {
  public user!: UserModel;
  constructor() {}
}
