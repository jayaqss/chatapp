import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profilemodel',
  templateUrl: './profilemodel.component.html',
  styleUrls: ['./profilemodel.component.scss'],
})
export class ProfilemodelComponent implements OnInit {
  name = 'shrikant';
  email = 'xyz@gmail.com';

  constructor(
    public dialogRef: MatDialogRef<ProfilemodelComponent>,
    private authenticationService: AuthenticationService
  ) {}

  closeDialog = () => {
    this.dialogRef.close();
  };

  userInfo = this.authenticationService.getUserInfo();
  ngOnInit(): void {}
}
