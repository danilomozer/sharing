import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth-service.service'
import { Router, Params, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { splitAtColon } from '@angular/compiler/src/util';
import { Observable } from 'rxjs';

//Firebase
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';

//Models
import { Balloon } from 'src/app/Model/Balloon';
import { Subject } from 'src/app/Model/Subject';

//Service
import {SubjectService} from '../../Services/subject.service'
import { FirebaseStorage } from 'angularfire2';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  
  saveLearn:boolean = false;
  saveTeach:boolean = false;

  //Armazenam os itens que seram enviados ao Firebase
  learnArray: Subject[] = [];
  teachArray: Subject[] = [];

  //usados para popular os baloes 
  learnBalloonItens:Balloon[] = [];
  teachBalloonItens:Balloon[] = [];

  displayName: string;

  teachForm: FormGroup;
  learnForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private firebaseAuth: AngularFireAuth,
    public authService: AuthService,
    public subjectService: SubjectService,
    private router: Router,
    private teachFormBuilder: FormBuilder,
    private learnFormBuilder: FormBuilder,
    private db : AngularFirestore
  ) {this.createForm()}

  createForm() {
    this.teachForm = this.teachFormBuilder.group({
      teach:['']
    });

    this.learnForm = this.learnFormBuilder.group({
      learn:['']
    });
  }

  ngOnInit() {
    this.displayName = this.firebaseAuth.auth.currentUser.displayName;
  }

  //Adiciona o item digitado ao vetor utilizado para lista os baloes de interesse na tela
  addItem(value, array){
    let balloon : Balloon = {};
    if(array === this.learnBalloonItens){
      balloon.item = value.learn
      this.createForm();
    }else{
      balloon.item = value.teach
      this.createForm();
    }
    array.push(balloon);
    return false;    
  }

  //Remove o item do Array de baloes
  delete(balloon, array){
    array.splice(array.indexOf(balloon), 1);
  }

  save(){this.saveLearnSubjects();this.saveTeachSubjects();this.navigate()}

  saveLearnSubjects(){
    console.log('Salvando itens de interesse')
    //Referencias do Firebase
    var userRef = this.db.collection('users').doc(this.firebaseAuth.auth.currentUser.uid);
    var learnRef = this.db.collection('subjects');

    //Percorre o vetor de interesses em Ensinar e adiciona ao banco de dados
    for(let balloon of this.learnBalloonItens){

      var queryRef = this.db.collection('subjects', ref => ref.where('subject', '==', balloon.item)).get()
      
      //Variaveis usadas para armazenar o id do documento caso ele exista
      var docId = ''
      var docExists: boolean;

      //Verifica se existe o documento no Firebase
      queryRef.subscribe(ref => {

        if(ref.docs.length === 0){
        learnRef.add({
          subject: balloon.item,
          learn: [this.firebaseAuth.auth.currentUser.uid],
          teach: []
        }).then(res => {
          userRef.update({
            learn: firebase.firestore.FieldValue.arrayUnion(res.id)
          });
          console.log('Added document with ID: ', res.id);
        });

        }else{
        var newRef = this.db.collection('subjects').doc(ref.docs[0].id);
        newRef.update({
          learn: firebase.firestore.FieldValue.arrayUnion(this.firebaseAuth.auth.currentUser.uid)
        }).then(ref => {
          userRef.update({
            learn: firebase.firestore.FieldValue.arrayUnion(newRef.ref.id)
          });
        });
        }
      });   
    }

    this.saveLearn = true;

  }
       
  saveTeachSubjects(){
    console.log('Salvando itens para compartilhar')
       //Referencias do Firebase
    var userRef = this.db.collection('users').doc(this.firebaseAuth.auth.currentUser.uid);
    var teachRef = this.db.collection('subjects');

    //Percorre o vetor de interesses em Ensinar e adiciona ao banco de dados
    for(let balloon of this.teachBalloonItens){

      var queryRef = this.db.collection('subjects', ref => ref.where('subject', '==', balloon.item)).get()
      
      //Variaveis usadas para armazenar o id do documento caso ele exista
      var docId = ''
      var docExists: boolean;

      //Verifica se existe o documento no Firebase
      queryRef.subscribe(ref => {

        if(ref.docs.length === 0){
        teachRef.add({
          subject: balloon.item,
          teach: [this.firebaseAuth.auth.currentUser.uid],
          lear: []
        }).then(res => {
          userRef.update({
            teach: firebase.firestore.FieldValue.arrayUnion(res.id)
          });
          console.log('Added document with ID: ', res.id);
        });

        }else{
        var newRef = this.db.collection('subjects').doc(ref.docs[0].id);
        newRef.update({
          teach: firebase.firestore.FieldValue.arrayUnion(this.firebaseAuth.auth.currentUser.uid)
        }).then(ref => {
          userRef.update({
            teach: firebase.firestore.FieldValue.arrayUnion(newRef.ref.id)
          });
        });
        }
      });   
    }
    this.saveTeach = true;
  }

  navigate(){
    while(this.saveLearn == true && this.saveTeach == true){
      this.router.navigateByUrl('/home');
      break;
    }
  }
  
}


