import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'
import {AngularFireList} from 'angularfire2/database'
import {Observable} from 'rxjs';
import {Subject} from '../Model/Subject';
import { CompileShallowModuleMetadata, CompileTemplateMetadata } from '@angular/compiler';
import {map} from 'rxjs/operators';
import { query } from '@angular/core/src/render3/query';
import { resetFakeAsyncZone } from '@angular/core/testing';

export interface SubjectId extends Subject { id: string; }


@Injectable({
  providedIn: 'root'
})

export class SubjectService {
 
  private itemsCollection: AngularFirestoreCollection<Subject>;
  items: Observable<Subject[]>;

  constructor(public db: AngularFirestore) { 

  }
  
  getSubjects(commit: string,subject: string){
    this.itemsCollection = this.db.collection<Subject>(commit);
    this.items = this.itemsCollection.valueChanges();
    return this.items;
  }

  checkSubject(subject:string){
    var queryRef = this.db.collection('learn', ref => ref.where('subject', '==', subject)).get();
      
    //Variaveis usadas para armazenar o id do documento caso ele exista
    var docId;
    //Verifica se existe o documento no Firebase
    queryRef.subscribe(
      result => console.log(),
      error => console.log(),
      () => console.log()
    )
  }

  getTeachSubjects(){
    
  }

}
