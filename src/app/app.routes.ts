import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { HomeComponent } from './Components/home/home.component';
import { ChatComponent } from './Components/chat/chat.component';
import { MyProfileComponent } from './Components/my-profile/my-profile.component';
import { AuthGuard } from './AuthGuard';
// import { UserComponent } from './user/user.component';
// import { UserResolver } from './user/user.resolver';
// import { AuthGuard } from './core/auth.guard';

export const rootRouterConfig: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent,  canActivate: [AuthGuard] },
  { path: 'my-profile', component: MyProfileComponent,  canActivate: [AuthGuard] },
//   { path: 'user', component: UserComponent,  resolve: { data: UserResolver}}
];