import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  token: string = '';
  currentUser = new BehaviorSubject<string>('');
  constructor() {}
}
