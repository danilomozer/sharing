import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  displayName: string;
  userImage: string = "../../../assets/user-placeholder.png";

  constructor(private firebaseAuth: AngularFireAuth) { }

  ngOnInit() {
    this.displayName = this.firebaseAuth.auth.currentUser.displayName;

    if(this.firebaseAuth.auth.currentUser.photoURL == null ||this.firebaseAuth.auth.currentUser.photoURL == ''){
      this.userImage = "../../../assets/user-placeholder.png";
    }else{
      this.userImage = this.firebaseAuth.auth.currentUser.photoURL;
    }
    
  }

}
