import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/auth.service';

import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public errors = {email: '', pass: ''};  // This one is public so that angular can access it
  model = {email: '', pass: ''};  // Model that angular will store data in
  user: User; // User that we will send to the database
  fbs: FirebaseService;

  validate() {
    this.errors = {email: '', pass: ''};
    if (!this.model.email) {
      this.errors.email = 'Please provide an email';
    }
    if (!this.model.pass) {
      this.errors.pass = 'Please provide a password';
    }
    return(this.errors.email || this.errors.pass);  // Returns true if there are errors
  }

  onSubmit() {
    if (this.validate()) { // If there are errors, do not submit the form
      return;
    }
    this.user = new User(this.model.email, this.model.pass);
    this.fbs.signin(this.user);
    localStorage.setItem('userEmail', this.user.email);
  }

  constructor(private firebase: FirebaseService) {
    this.fbs = firebase;
  }

}
