import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChatserviceService } from 'src/app/services/chatservice/chatservice.service';
import { ProfilemodelComponent } from '../profilemodel/profilemodel.component';

@Component({
  selector: 'app-sidedrawer',
  templateUrl: './sidedrawer.component.html',
  styleUrls: ['./sidedrawer.component.scss'],
})
export class SidedrawerComponent {
  searchUserData = [];

  title = 'angular-frontend';

  constructor(
    public dialogRef: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService,
    private chatservice: ChatserviceService
  ) {}
  openDialog = () => {
    this.dialogRef.open(ProfilemodelComponent, {
      height: '400px',
      width: '500px',
    });
  };

  openNav() {
    document.getElementById('mySidenav').style.width = '280px';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }

  logoutHandler = () => {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/']);
  };

  userInfo = this.authenticationService.getUserInfo();

  searchUserValue: string;
  searchUser() {
    console.log(this.searchUserValue);
    this.chatservice.searchUser(this.searchUserValue).subscribe(
      (res) => {
        console.log(res);
        this.searchUserData = res;
      },
      (err) => console.log(err)
    );
  }

  accessChat(userId) {
    this.chatservice.accessChat(userId).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }
}
