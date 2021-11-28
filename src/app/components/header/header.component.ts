import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  @Input() userEmail = '';
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.userEmail = JSON.parse(this.user);
  }

  logout() {
    this.authService.logout().subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['/']);
      },
      (err: any) => console.error(err)
    );
  }

}


