import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, Route, CanLoad } from '@angular/router';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: User = { isUserAuthenticated: false, email: '', password: '' };
  constructor(private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.userIsAuthenticated();
  }
  canLoad(route: Route): boolean {
      return this.userIsAuthenticated();
  }
  userIsAuthenticated() {
      if (this.user.isUserAuthenticated) {
          return true;
      } else {
          window.alert('Vous n\'avez pas les permissions pour voir cette page.');
          this.router.navigateByUrl('');
          return false;
      }
  }

}
