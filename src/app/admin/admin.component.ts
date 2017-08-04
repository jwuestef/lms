import { Component } from '@angular/core';
import { FirebaseService } from '../services/auth.service';

import { User } from '../models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

// TODO: Add the firebase rejections to validate
export class AdminComponent {
  public errors = {email: '', pass: '', confpass: ''}; // This one is public so that angular can access it
  model = {email: '', pass: '', confpass: ''}; // Model that angular will store data in
  user: User; // User that we will send to the database
  fbs: FirebaseService;

  validate() {
    this.errors = {email: '', pass: '', confpass: ''};
    if (!this.model.email) {
      this.errors.email = 'Please provide a username';
    }
    if (!this.model.pass) {
      this.errors.pass = 'Please provide a password';
    }
    if (!this.model.confpass) {
      this.errors.confpass = 'Please confirm your password';
    }
    if (this.model.confpass !== this.model.pass) {
      this.errors.confpass = 'Passwords must match';
    }
    return(this.errors.email || this.errors.pass || this.errors.confpass); // Returns true if there are errors
  }

  onSubmit() {
    if (this.validate()) {  // If there are errors, do not submit the form
      return;
    }
    this.user = new User(this.model.email, this.model.pass); // Create a new user object with the model email and password
    console.log(this.user);
    // Pass the user to the db here
    this.fbs.signup(this.user);
    console.log(this.fbs.isAuthed());
  }

  constructor(private firebase: FirebaseService){
    this.fbs = firebase;
    console.log(this.fbs.isAuthed());
  }
}
