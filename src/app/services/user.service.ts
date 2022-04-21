import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  currentUser = new BehaviorSubject<string>('');
  constructor() {}
}
