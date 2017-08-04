import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { LoginComponent } from '../login/login.component';
import { FirebaseService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  userEmail: string;


  signout() {
    localStorage.clear();
    this.Router.navigateByUrl('/');
  }

  ngOnInit() {
    this.userEmail = localStorage.getItem('userEmail');
  }

  constructor(private FirebaseService: FirebaseService, private Router: Router) {
    this.FirebaseService = FirebaseService;
  }

}
