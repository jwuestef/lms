import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/auth.service';

import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public errors = {username: '', pass: ''};  // This one is public so that angular can access it
  model = {username: '', pass: ''};  // Model that angular will store data in
  user: User; // User that we will send to the database
  userUsername: string;  // Just the student10, no @elevenfifty.org
  usernameToSend: string;  // The username that gets sent to Firebase, includes @elevenfifty.org
  fbs: FirebaseService;

  validate() {
    this.errors = {username: '', pass: ''};
    if (!this.model.username) {
      this.errors.username = 'Please provide an username';
    }
    if (!this.model.pass) {
      this.errors.pass = 'Please provide a password';
    }
    return(this.errors.username || this.errors.pass);  // Returns true if there are errors
  }

  onSubmit() {
    if (this.validate()) { // If there are errors, do not submit the form
      return;
    }
    this.userUsername = this.model.username;
    this.usernameToSend = this.model.username + '@elevenfifty.org';
    this.user = new User(this.usernameToSend, this.model.pass);
    this.fbs.signin(this.user);
    localStorage.setItem('navbarUsername', this.userUsername);
  }

  constructor(private firebase: FirebaseService) {
    this.fbs = firebase;
  }

}
