import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChatserviceService } from 'src/app/services/chatservice/chatservice.service';

@Component({
  selector: 'app-mychats',
  templateUrl: './mychats.component.html',
  styleUrls: ['./mychats.component.scss'],
})
export class MychatsComponent implements OnInit {
  fetchchatData = [];
  loggedUser;
  chatUserName;
  chatDetail;
  isChatSelected = false;

  constructor(
    private chatservice: ChatserviceService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.chatservice.fetchChat().subscribe(
      (res) => {
        this.fetchchatData = res;
        console.log(res);
      },
      (err) => console.log(err)
    );
    this.loggedUser = this.authenticationService.getUserInfo();
  }

  getSender(users) {
    // console.log(this.loggedUser._id);
    // console.log(users[0]._id);
    return users[0]._id === this.loggedUser._id ? users[1].name : users[0].name;
  }

  showChat(chat) {
    // console.log(chat);
    this.chatDetail = chat;
    this.isChatSelected = true;
    this.chatUserName = !chat.isGroupChat
      ? this.getSender(chat.users)
      : chat.chatName;
  }
}
