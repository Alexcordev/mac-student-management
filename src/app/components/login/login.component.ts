import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = { isUserAuthenticated: false, email: '', password: '' };
  message: string = '';
  text: string = '';
  username: any;
  storedData: any;
  form: any;
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  login() {
    this.submitted = true;
    this.authService.login(this.user).subscribe(
      (data) => this.loginSuccess(data),
      (error) => this.loginError(error)
    );
  }

  loginSuccess(data: User) {
    Swal.fire({
      title: 'Vous êtes connecté',
      text: 'Bienvenue ' + this.user.email,
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#333',
    });
    this.user.isUserAuthenticated = true;
    this.router.navigate(['/students/', this.user.email]);
    localStorage.setItem('user', JSON.stringify(this.user.email));
  }

  loginError(error: any) {
    this.user.isUserAuthenticated = false;
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Courriel ou mot de passe invalide',
      confirmButtonColor: '#333',
    });
    console.log('NOT logged in', error);
  }
}
