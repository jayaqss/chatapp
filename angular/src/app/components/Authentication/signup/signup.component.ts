import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../../services/authentication.service';

class CustomValidators {
  static passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')!.value;
    const confirmPassword = control.get('confirmPassword')!.value;

    if (
      password === confirmPassword &&
      password !== null &&
      confirmPassword !== null
    ) {
      return null;
    } else {
      return { passwordsNotMatching: true };
    }
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        name: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
        ]),
      },
      { validators: CustomValidators.passwordsMatch }
    );
  }

  onSubmit() {
    if (this.signupForm.invalid) return;
    this.authService.signup(this.signupForm.value).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
