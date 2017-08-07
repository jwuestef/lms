import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../models/user';
import { LoginComponent } from '../login/login.component';
import { FirebaseService } from '../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: User;
  navbarUsername: string;

  signout() {
    localStorage.clear();
    this.Router.navigateByUrl('/');
  }

  constructor(private FirebaseService: FirebaseService, private Router: Router, public afa: AngularFireAuth) {
    this.FirebaseService = FirebaseService;
    this.navbarUsername = localStorage.getItem('navbarUsername');
  }

}
