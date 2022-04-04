import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'chat-application';
  constructor(private _authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this._authenticationService.autoSignIn();
  }
}
