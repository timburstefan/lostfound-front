import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoggedGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem('currentUserToken')) {
      return true;
    }
    this.router.navigate(['/welcome']);
    return false;
  }
}
