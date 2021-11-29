import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _userIsAuthenticated = false;
  user: User = {_id: '', email: '', password: ''};
  private _user = new BehaviorSubject<User>(this.user);
  baseURL='/auth'
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  login(user: User) {
    console.log(user);
    this._userIsAuthenticated = true;
    return this.http.post<User>(`${this.baseURL}/login`, user, this.httpOptions);
  }

  register(user: User) {
    console.log(user);
    return this.http.post<User>(`${this.baseURL}/register`, user, this.httpOptions);
  }

  isUserLoggedIn() {
    return this._userIsAuthenticated;
  }

  logout() {
    this._userIsAuthenticated = false;
    return this.http.get(`${this.baseURL}/logout`);
  }


}

