import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserModel } from '../appModels/user.model';

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
  user = new BehaviorSubject<UserModel | null>(null);

  constructor(private http: HttpClient) {}

  login(loginForm: LoginForm) {
    return this.http
      .post<any>('http://localhost:5000/api/user/login', {
        email: loginForm.email,
        password: loginForm.password,
      })
      .pipe(
        tap((res) => {
          this.authenticatedUser(
            res.email,
            res.name,
            res._id,
            res.picture,
            res.token
          );
        })
      );
  }

  signup(user: User) {
    return this.http
      .post<any>('http://localhost:5000/api/user', {
        name: user.name,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
      })
      .pipe(
        tap((res) => {
          this.authenticatedUser(
            res.email,
            res.name,
            res._id,
            res.picture,
            res.token
          );
        })
      );
  }

  autoSignIn() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo) {
      return;
    }

    const loggedInUser = new UserModel(
      userInfo.email,
      userInfo.name,
      userInfo._id,
      userInfo.picture,
      userInfo.token
    );

    this.user.next(loggedInUser);
  }

  private authenticatedUser(
    email: any,
    name: any,
    _id: any,
    picture: any,
    token: any
  ) {
    const user = new UserModel(email, name, _id, picture, token);
    console.log(user);
    this.user.next(user);
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  getUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    return userInfo;
  }
}
