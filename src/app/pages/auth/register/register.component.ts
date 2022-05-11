import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      username: ['', Validators.required],
      password: [
        '',
        [Validators.required, this.matchValidator('confirmPassword', true)],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.matchValidator('password')],
      ],
    });
  }

  onSubmit() {
    if (this.registerForm.valid)
      this.authService
        .register(this.registerForm.value)
        .subscribe((res) => console.log(res));
    // console.log(this.registerForm.value);
  }

  matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo];

        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent &&
        !!control.parent.value &&
        control.value === (control.parent?.controls as any)[matchTo].value
        ? null
        : { matching: true };
    };
  }
}
