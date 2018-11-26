import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/toPromise';

//Firebase Imports
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  errorMessage: string = '';
  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  tryLogin(value){
    this.doLogin(value)
    .then(res => {
      if(res.additionalUserInfo.isNewUser == true){
        this.router.navigateByUrl('/welcome');
      }else{
        this.router.navigateByUrl('/home');
      }
    }, err => {
      this.errorMessage = err.message;
      console.log(this.errorMessage);
      alert(this.errorMessage);
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
    });
  }

}

