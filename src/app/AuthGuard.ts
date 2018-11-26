import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './Services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService) {}

  canActivate() {
    return this.loginService.isLoggedIn();
  }
}