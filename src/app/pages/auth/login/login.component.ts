import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/models';
import { GeneralServce } from 'src/app/services/general.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private generalService: GeneralServce
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.loginForm.valid)
      this.authService.login(this.loginForm.value).subscribe((data) => {
        this.generalService.openSnackBar('Logged in succesfully');
        console.log('Datele de la back dupa logare:');
        console.log(data);
        this.router.navigate(['/home']);
      });
  }
}
