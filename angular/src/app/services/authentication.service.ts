import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

export interface LoginForm {
  email: string;
  password: string;
}

export interface User {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(loginForm: LoginForm) {
    return this.http.post<any>('http://localhost:5000/api/user/login', {
      email: loginForm.email,
      password: loginForm.password,
    });
  }

  signup(user: User) {
    return this.http.post<any>('http://localhost:5000/api/user', {
      name: user.name,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
    });
  }
}
