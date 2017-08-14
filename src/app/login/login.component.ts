import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { FirebaseService } from '../services/auth.service';
import { User } from '../models/user';
import { EventService } from '../services/event.service';
import { StudentService } from '../services/student.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // This one is public so that angular can access it
  public loginErrors = { username: '', pass: '' };
  public signupErrors = { username: '', pass: '' };
  // Model that angular will store data in
  loginModel = { username: '', pass: '' };
  signupModel = { username: '', pass: '' };
  // User that we will send to the database
  user: User;
  // Just the student10, no @elevenfifty.org
  userUsernameLogin: string;
  userUsernameSignup: string;
  // The username that gets sent to Firebase, includes @elevenfifty.org
  usernameToSendLogin: string;
  usernameToSendSignup: string;
  // The array of students
  studentTableArray;
  // Variables to track whether we're viewing Login vs Signup form
  isLogin = true;
  isSignup = false;


  // The contructor function runs automatically on component load, each and every time it's called
  constructor(public es: EventService, public fbs: FirebaseService, public afd: AngularFireDatabase, private ss: StudentService) {
    // Wipe any pre-existing calendar or event information
    this.es.currentCalender = null;
    this.es.eventArray = [];
  }



  // If the signup form isn't completely filled out, set error messages
  validateSignup() {
    this.signupErrors = { username: '', pass: '' };
    if (!this.signupModel.username) {
      this.signupErrors.username = 'Please provide an username';
    }
    if (!this.signupModel.pass) {
      this.signupErrors.pass = 'Please provide a password';
    }
    // Returns true if there are errors
    return (this.signupErrors.username || this.signupErrors.pass);
  }



  // Handles signup logic
  onSignup() {
    // If there are errors, do not submit the form
    if (this.validateSignup()) {
      return;
    }
    this.userUsernameSignup = this.signupModel.username.toLowerCase();
    // Check if this.userUsernameSignup (which is just 'student11' - no @elevenfifty.org) is in the 'students' table in Firebase
    const thisSaved = this;
    this.afd.database.ref('/students').once('value').then(function (studentTableAsObject) {
      const isValidStudent = studentTableAsObject.val().hasOwnProperty(thisSaved.userUsernameSignup);
      if (!isValidStudent) {
        alert('The provided signup information isn\'t authorized to view any calendars, account NOT created!');
      } else {
        // console.log('Valid student located in "student" table in Firebase. Allowing signup to proceed...');
        // Construct a user from given information
        thisSaved.usernameToSendSignup = thisSaved.signupModel.username + '@elevenfifty.org';
        thisSaved.user = new User(thisSaved.usernameToSendSignup, thisSaved.signupModel.pass);
        // Call signup function from the service, and then save the username in local storage so we can show it in the navbar
        thisSaved.fbs.signup(thisSaved.user).then(function (err) {
          if (err !== undefined) {
            // If there is an error, then display a message to the user
            // If it's the error talking about an email address in use, then re-word it to say 'username' instead
            if (err.message === 'The email address is already in use by another account.') {
              err.message = 'This username is already in use by another account.';
            }
            thisSaved.signupErrors.pass = err.message;
          } else {
            // Set the local storage item to be our username, so our navbar can display it
            thisSaved.ss.currentStudentUsername = thisSaved.userUsernameSignup;
            localStorage.setItem('navbarUsername', thisSaved.userUsernameSignup);
          }
        });
      }
    });
  }



  // If the login form isn't completely filled out, set error messages
  validateLogin() {
    this.loginErrors = { username: '', pass: '' };
    if (!this.loginModel.username) {
      this.loginErrors.username = 'Please provide an username';
    }
    if (!this.loginModel.pass) {
      this.loginErrors.pass = 'Please provide a password';
    }
    // Returns true if there are errors
    return (this.loginErrors.username || this.loginErrors.pass);
  }



  // Handles login logic
  onLogin() {
    // If there are errors, do not submit the form
    if (this.validateLogin()) {
      return;
    }
    this.userUsernameLogin = this.loginModel.username.toLowerCase();
    this.usernameToSendLogin = this.loginModel.username.toLowerCase() + '@elevenfifty.org';
    // Constructs user to login to firebase with, then login using the service
    this.user = new User(this.usernameToSendLogin, this.loginModel.pass);
    const thisSaved = this;
    this.fbs.login(this.user).then(function (err) {
      if (err !== undefined) {
        // If there is an error, then display a message to the user
        thisSaved.loginErrors.pass = 'Username & password combination invalid, or user does not exist';
      } else {
        // Set the local storage item to be our username, so our navbar can display it
        thisSaved.ss.currentStudentUsername = thisSaved.userUsernameLogin;
        localStorage.setItem('navbarUsername', thisSaved.userUsernameLogin);
      }
    });
  }



  // When the buttons (fake tabs) are clicked, update variables to switch between Login and Signup
  showLogin() {
    this.isSignup = false;
    this.isLogin = true;
  }
  showSignup() {
    this.isLogin = false;
    this.isSignup = true;
  }



} // End of component
