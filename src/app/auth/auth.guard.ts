import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { TokenStorage } from '../shared/common/token-validity';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = TokenStorage.getToken();
    const isExpired = TokenStorage.isTokenExpired();

    if (token && !isExpired) {
      return true;
    }
    TokenStorage.removeToken();
    return this.router.parseUrl('/login');
  }
}
