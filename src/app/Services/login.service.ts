import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  message: string = "";

  constructor(public firebaseAuth: AngularFireAuth, private router: Router) { }

  isLoggedIn():boolean{
    if(this.firebaseAuth.auth.currentUser != null){
      console.log('Sessão ativa, usuário logado!')
      return true;
    }else{
      this.message = "Faça o login para acessar a página."
      this.router.navigate(['/login', {feedback: this.message}]);
      return false;
    }
  }

}
