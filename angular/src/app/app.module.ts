import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DemoMaterialModule } from './material-module';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/Authentication/signup/signup.component';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { LoginComponent } from './components/Authentication/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { ChatpageComponent } from './Pages/chatpage/chatpage.component';
import { MychatsComponent } from './components/mychats/mychats.component';
import { SidedrawerComponent } from './components/miscellaneous/sidedrawer/sidedrawer.component';
import { ProfilemodelComponent } from './components/miscellaneous/profilemodel/profilemodel.component';
import { AuthenticationInterceptor } from './services/authentication.interceptor';
import { SidebarComponent } from './components/miscellaneous/sidebar/sidebar.component';
import { UserlistitemComponent } from './components/useravatar/userlistitem/userlistitem.component';
import { ChatserviceService } from './services/chatservice/chatservice.service';
import { ChatInterceptor } from './services/chatservice/chat.interceptor';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { SocketserviceService } from './services/socketservice.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomepageComponent,
    LoginComponent,
    ChatpageComponent,
    MychatsComponent,
    SidedrawerComponent,
    ProfilemodelComponent,
    SidebarComponent,
    UserlistitemComponent,
    ChatBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  providers: [
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ChatInterceptor,
      multi: true,
    },
    ChatserviceService,
    SocketserviceService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
