// import { Component, Input, OnInit } from '@angular/core';
// import io from 'socket.io-client';
// import { ChatModel } from 'src/app/appModels/chat.model';
// import { AuthenticationService } from 'src/app/services/authentication.service';
// import { ChatserviceService } from 'src/app/services/chatservice/chatservice.service';
// import { SocketserviceService } from 'src/app/services/socketservice.service';

// const ENDPOINT = 'http://localhost:5000';

// @Component({
//   selector: 'app-chat-box',
//   templateUrl: './chat-box.component.html',
//   styleUrls: ['./chat-box.component.scss'],
// })
// export class ChatBoxComponent implements OnInit {
//   user: any;
//   socket: any;
//   message!: string;
//   socketConnected: boolean = false;
//   typing: boolean = false;
//   @Input() userName: String;
//   @Input() chatDetail: ChatModel;
//   allmessages = [];
//   // chats = ['hi', 'hello'] as any;

//   constructor(
//     private authenticationService: AuthenticationService,
//     private chatService: ChatserviceService,
//     private socketService: SocketserviceService
//   ) {}

//   ngOnInit(): void {
//     // console.log(this.chatDetail);
//     this.fetchMessages();
//     this.user = this.authenticationService.getUserInfo();

//     this.socket.on('message recieved', (newMessageRecieved) => {
//       this.allmessages = [...this.allmessages, newMessageRecieved];
//     });

//     this.setupSocketConnection();
//   }

//   setupSocketConnection() {
//     this.socket = io(ENDPOINT);
//     this.socket.emit('setup', this.user);
//     this.socket.emit('join chat', this.chatDetail._id);
//     this.socket.on('connected', () => this.setsocketConnected(true));
//     // this.socket.on('typing', () => this.setIsTyping(true));
//     // this.socket.on('stop typing', () => this.setIsTyping(false));
//   }
//   sendMsg() {
//     console.log(this.chatDetail._id);
//     console.log(this.message);
//     // this.socket.emit('stop typing', this.chatDetail._id);
//     console.log(this.user._id);
//     this.chatService.sendMessage(this.message, this.chatDetail._id).subscribe(
//       (res) => {
//         console.log(res);
//         this.socket.emit('new message', res);
//         this.allmessages = [...this.allmessages, res];
//         this.fetchMessages();
//       },
//       (err) => console.log(err)
//     );
//   }

//   setsocketConnected(value) {
//     this.socketConnected = value;
//   }

//   setIsTyping(value) {
//     this.typing = value;
//   }
//   fetchMessages() {
//     this.chatService.fetchMessage(this.chatDetail._id).subscribe(
//       (res) => {
//         console.log(res);
//         this.allmessages = res;
//         console.log(this.allmessages);
//       },
//       (err) => console.log(err)
//     );
//   }
// }

import { Component, Input, OnInit } from '@angular/core';
import io from 'socket.io-client';
import { ChatModel } from 'src/app/appModels/chat.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChatserviceService } from 'src/app/services/chatservice/chatservice.service';
import { SocketserviceService } from 'src/app/services/socketservice.service';

const ENDPOINT = 'http://localhost:5000';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  user: any;
  socket: any;
  message!: string;
  socketConnected: boolean = false;
  typing: boolean = false;
  @Input() userName: String;
  @Input() chatDetail: ChatModel;
  allmessages = [];
  // chats = ['hi', 'hello'] as any;

  constructor(
    private authenticationService: AuthenticationService,
    private chatService: ChatserviceService,
    private socketService: SocketserviceService
  ) {}

  ngOnInit(): void {
    this.user = this.authenticationService.getUserInfo();
    this.fetchMessages();
    this.socketService.setup(this.user);
    this.socketService.joinRoom(this.chatDetail._id);
    this.socketService.getMessage().subscribe((data) => {
      this.allmessages.push(data);
    });
  }

  sendMsg() {
    this.chatService.sendMessage(this.message, this.chatDetail._id).subscribe(
      (res) => {
        console.log(res);
        // this.socket.emit('new message', res);
        this.socketService.sendMessage(res);
        this.allmessages = [...this.allmessages, res];
        this.fetchMessages();
        this.message = '';
      },
      (err) => console.log(err)
    );
  }

  fetchMessages() {
    this.chatService.fetchMessage(this.chatDetail._id).subscribe(
      (res) => {
        console.log(res);
        this.allmessages = res;
        console.log(this.allmessages);
      },
      (err) => console.log(err)
    );
  }
}
