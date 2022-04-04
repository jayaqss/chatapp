import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketserviceService {
  private socket: Socket;
  private url = 'http://localhost:5000';
  private msgData: string;

  constructor() {
    this.socket = io(this.url, {
      transports: ['websocket', 'polling', 'flashsocket'],
    });
  }

  setup(user): void {
    this.socket.emit('setup', user);
  }

  joinUser(userId): void {
    this.socket.on('connected', userId);
  }

  joinRoom(chatId): void {
    // this.socket.on('connected', );
    this.socket.emit('join chat', chatId);
    // this.socket.on('typing', () => this.setIsTyping(true));
    // this.socket.on('stop typing', () => this.setIsTyping(false));
  }

  sendMessage(data): void {
    this.socket.emit('new message', data);
  }

  // getMessage(): void {
  //   this.socket.on('message recieved', (data) => {
  //     //       observer.next(data);
  //     return data;
  //   });
  // }

  getMessage(): Observable<any> {
    let observable = new Observable<any>((observer) => {
      this.socket.on('message recieved', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    console.log(observable);
    return observable;
  }

  // getStorage() {
  //   const storage: string = localStorage.getItem('chats');
  //   return storage ? JSON.parse(storage) : [];
  // }

  // setStorage(data) {
  //   localStorage.setItem('chats', JSON.stringify(data));
  // }
}
