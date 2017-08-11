import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { User } from '../models/user';


@Injectable()
export class FirebaseService {
  authState;



  // The contructor function runs automatically on service load, each and every time it's called
  constructor(public afa: AngularFireAuth, public router: Router, public afd: AngularFireDatabase) {
    this.afa.authState.subscribe((authState) => {
      this.authState = authState;
    });
  }



  // Signs the user up via Firebase, and logs them in
  // Verification they're allowed to sign up has already been made prior to calling this function
  signup(user: User) {
    // Create a user in Firebase
    return this.afa.auth.createUserWithEmailAndPassword(user.username, user.password).then(() => {
      // Signup successful
      this.router.navigateByUrl('/student');
      return;
    }).catch((err) => {
      // console.log('Error in signup function inside auth.service.ts: ');
      // console.log(err);
      return err;
    });
  }



  // Logs the user in through Firebase authentication
  login(user: User) {
    return this.afa.auth.signInWithEmailAndPassword(user.username, user.password).then(() => {
      // If we succeed in logging in, check if they are on the admin table... then route appropriately
      // Query the isAdmin table in Firebase
      const thisSaved = this;
      this.afd.database.ref('/isAdmin').once('value').then(function (isAdminTable) {
        const arrayOfAdmins = isAdminTable.val();
        // Pull the username out of the authentication data
        const authData = thisSaved.afa.auth.currentUser.email;
        const atSign = authData.search('@');
        const userToCheckIfAdmin = authData.slice(0, atSign);
        // If the user is on the whitelist-admin table that we pulled from Firebase.... set this true/false boolean to variable
        const isAdmin = arrayOfAdmins.hasOwnProperty(userToCheckIfAdmin);
        // Routes based on isAdmin status
        if (isAdmin) {
          thisSaved.router.navigateByUrl('/admin');
          return;
        } else {
          thisSaved.router.navigateByUrl('/student');
          return;
        }
      });
    }).catch((err) => {
      // console.log('Error in login function inside auth.service.ts: ');
      // console.log(err);
      return err;
    });
  }



  // Signs user out with given Firebase method, and clear the local storage
  signout() {
    this.afa.auth.signOut().then(() => {
      localStorage.clear();
      this.router.navigateByUrl('/');
    }).catch((err) => {
      console.log('Error in signout function inside auth.service.ts: ');
      console.log(err);
    });
  }



  // Check whether the current user is authenticated, !! forces result to be true/false (as opposed to null or undefined)
  isAuthed() {
    return !!this.authState;
  }



}  // End of component
