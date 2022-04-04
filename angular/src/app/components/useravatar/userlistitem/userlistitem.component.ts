import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/appModels/user.model';

@Component({
  selector: 'app-userlistitem',
  templateUrl: './userlistitem.component.html',
  styleUrls: ['./userlistitem.component.scss'],
})
export class UserlistitemComponent implements OnInit {
  @Input() user: UserModel;
  @Input() index: number;

  constructor() {}

  ngOnInit(): void {}
}
