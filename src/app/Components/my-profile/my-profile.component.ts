import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  private displayName: string;
  private job : string;
  
  constructor(
    private firebaseAuth: AngularFireAuth,
    private db : AngularFirestore) { }

  ngOnInit() {

    var userRef = this.db.collection('users').doc(this.firebaseAuth.auth.currentUser.uid).valueChanges();
    userRef.subscribe(res => {
      var user = res as User;
      this.displayName = `${user.name} ${user.lastName}`;
      this.job = user.job;
    })

  }

}
