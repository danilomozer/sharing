import { Component, OnInit } from '@angular/core';
import { User } from '../../Model/User';
import { AuthService } from '../../Services/auth-service.service'
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  login(value){
    this.authService.tryLogin(value);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  };

  ngOnInit() {
   if(this.route.snapshot.paramMap.get('feedback') != null){
    //TODO: mostrar o erro na página
   };
  }

}
