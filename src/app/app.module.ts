//Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { FormsModule } from '@angular/forms';

//Guard
import { AuthGuard } from './AuthGuard';

//Firebase imports
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { ChatComponent } from './Components/chat/chat.component';
import { MyProfileComponent } from './Components/my-profile/my-profile.component';
import { BalloonComponent } from './Components/balloon/balloon.component';

//Services
import { AuthService } from './Services/auth-service.service';
import { UserService } from './Services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './Services/login.service';
import { SubjectService } from './Services/subject.service';

//Environment
import { environment } from '../environments/environment';
import { CardComponent } from './Components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    NavbarComponent,
    HomeComponent,
    ChatComponent,
    MyProfileComponent,
    BalloonComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rootRouterConfig),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,UserService, LoginService, AuthGuard, SubjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
