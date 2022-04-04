import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this._authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + user.token,
          },
        });

        return next.handle(modifiedReq);
      })
    );
  }
}
