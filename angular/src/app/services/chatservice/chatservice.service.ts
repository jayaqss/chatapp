import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map } from 'rxjs';
import { take } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ChatserviceService {
  constructor(
    private http: HttpClient,
    private _authService: AuthenticationService
  ) {}

  searchUser(search: string) {
    // console.log(search);
    return this._authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<any>(
          `http://localhost:5000/api/user?search=${search}`
        );
      })
    );
  }

  fetchChat() {
    return this.http.get<any>(`http://localhost:5000/api/chat`);
  }

  accessChat(userId: string) {
    return this.http.post<any>(`http://localhost:5000/api/chat`, {
      userId: userId,
    });
  }

  sendMessage(message: String, chatId: string) {
    return this.http.post<any>(`http://localhost:5000/api/message`, {
      content: message,
      chatId: chatId,
    });
  }

  fetchMessage(chatId: string) {
    return this.http.get<any>(`http://localhost:5000/api/message/${chatId}`);
  }
}
