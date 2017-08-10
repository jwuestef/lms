import { Injectable } from '@angular/core';
import { User } from '../models/user';

import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class FirebaseService {
  authState;



  constructor(public afa: AngularFireAuth, public router: Router, public afd: AngularFireDatabase) {
    this.afa.authState.subscribe((authState) => {
      this.authState = authState;
    });
  }



  signup(user: User) {
    // create a user in Firebase
    this.afa.auth.createUserWithEmailAndPassword(user.username, user.password)
      .then(() => {
        // console.log('Signup successful!');
        this.router.navigateByUrl('/student');
      })
      .catch((err) => {
        console.log('Error in signup function inside auth.service.ts: ');
        console.log(err);
      });
  }



  login(user: User) {
    // signs user in through Firebase method
    this.afa.auth.signInWithEmailAndPassword(user.username, user.password)
      .then(() => {
        // if we succeed in logging in, check if they are on the admin table... then route appropriately
        const thisSaved = this;
        this.afd.database.ref('/isAdmin').once('value').then(function (isAdminTable) {
          const arrayOfAdmins = isAdminTable.val();
          const authData = thisSaved.afa.auth.currentUser.email;
          const atSign = authData.search('@');
          const userToCheckIfAdmin = authData.slice(0, atSign);
          // if the user is on the whitelist-admin table that we pulled from Firebase.... set this true/false boolean to variable
          const isAdmin = arrayOfAdmins.hasOwnProperty(userToCheckIfAdmin);
          // routes based on isAdmin status
          if (isAdmin) {
            thisSaved.router.navigateByUrl('/admin');
          } else {
            thisSaved.router.navigateByUrl('/student');
          }
        });
      })
      .catch((err) => {
        console.log('Error in login function inside auth.service.ts: ');
        console.log(err);
      });
  }



  signout() {
    // signs user out with given Firebase method, and clear the local storage
    this.afa.auth.signOut()
      .then(() => {
        localStorage.clear();
        this.router.navigateByUrl('/');
      })
      .catch((err) => {
        console.log('Error in signout function inside auth.service.ts: ');
        console.log(err);
      });
  }



  // check whether the current user is authenticated, forces to be true/false
  isAuthed() {
    return !!this.authState;
  }



}  // End of component
