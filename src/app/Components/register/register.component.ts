import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth-service.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  exception: boolean = false;
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
  constructor(
    private router: Router,
    public authService: AuthService,
    private fb: FormBuilder,
    private db : AngularFirestore,
    public firebaseAuth: AngularFireAuth
  ) {
    this.createForm();
   }

   createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required],
      name: ['', Validators.required ],
      lastName: ['', Validators.required ],
      birthday: ['', Validators.required ],
      job: ['',Validators.required]
    });
  }

  tryRegister(value){
    this.authService.doRegister(value)
    .then(res => {
      this.saveUserData(value, res);
      this.errorMessage = "";
      this.successMessage = "Conta criada com sucesso!";
      if(res.additionalUserInfo.isNewUser === true){
        this.router.navigateByUrl('/welcome');
      }else{
        this.router.navigateByUrl('/home');
      }
    }, err => {
      console.log("Erro" + err);
      this.errorMessage = err.message;
      this.exception = true;
      this.successMessage = "";
    })
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        console.log(res)
        resolve(res);
      }, err => reject(err))
    })
  }

  saveUserData(value,res):void{
    var userRef = this.db.collection('users').doc(res.user.uid)
    userRef.set({
      name : value.name.toString(),
      lastName : value.lastName.toString(),
      birthday : value.birthday.toString(),
      job: value.job.toString(),
      learn: [],
      teach: [],
      rating: {},
      chats: []
    })

    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: `${value.name} ${value.lastName}`,
      photoURL: ""
    })

    .catch(function(error) {
        alert("Error writing document: " + error);
    });
  }

  
}


