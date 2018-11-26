import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/toPromise';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from 'rxjs';
import {User} from '../Model/User'
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  items: Observable<string[]>;
  userId: string = '';

  userDoc: AngularFirestoreDocument<User>;
  user: any;


  constructor(
    public db: AngularFirestore, public afAuth: AngularFireAuth  ){
    // this.userDoc = this.db.doc<User>(`user/${this.afAuth.auth.currentUser.uid}`)
  }

  getUser():any{

    var ref = this.db.collection('users').doc(this.afAuth.auth.currentUser.uid).valueChanges();
    
      ref.subscribe(res =>{
        var user = res as User;
        // this.userList = user.learn;
        var list = user.learn;
      })
   
  }

  getMySubjects(){  
  }

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          resolve(user.uid);
          this.userId = user.uid;
          this.getMySubjects();
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  updateCurrentUser(value){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res)
      }, err => reject(err))
    })
  }

  getUserData(){
    var userRef = this.db.collection('users').doc(this.afAuth.auth.currentUser.uid)
    return userRef.update({
      learn: firebase.firestore.FieldValue
    })
  }
 
}
