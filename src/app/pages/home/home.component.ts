import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser: string = '';
  constructor(private userService: UserService) {
    this.userService.currentUser.subscribe(
      (username) => (this.currentUser = username)
    );
  }

  ngOnInit(): void {}
}
