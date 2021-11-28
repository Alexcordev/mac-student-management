import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = { email: '', password: '' };
  username: any;
  form: any;
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  register() {
    this.submitted = true;
    this.authService.register(this.user).subscribe(
      (data) => this.registerSuccess(data),
      (error) => this.registerError(error)
    );
  }

  registerSuccess(data: User) {
    Swal.fire({
      title: 'Votre compte a été créé',
      text: 'Merci ' + this.user.email,
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#333',
    });
    this.router.navigate(['']);
  }

  registerError(error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Courriel ou mot de passe invalide',
      confirmButtonColor: '#333',
    });
    console.log('NOT registered', error);
  }
}
