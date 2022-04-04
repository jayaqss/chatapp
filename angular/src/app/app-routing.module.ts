import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { ChatpageComponent } from './Pages/chatpage/chatpage.component';
import { AuthenticationGuard } from './services/authentication.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'chats',
    canActivate: [AuthenticationGuard],
    component: ChatpageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
