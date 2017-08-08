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
    this.afa.auth.createUserWithEmailAndPassword(user.username, user.password)
      .then(() => {
        console.log('Signup successful!');
        this.router.navigateByUrl('/student');
      })
      .catch((err) => {
        console.log('Error in signup function inside auth.service.ts: ');
        console.log(err);
      });
    console.log('this.isAuthed() is:');
    console.log(this.isAuthed());
  }

  login(user: User) {
    console.log('login function called inside auth.service.ts');
    this.afa.auth.signInWithEmailAndPassword(user.username, user.password)
      .then(() => {
        const thisSaved = this;
        this.afd.database.ref('/isAdmin').once('value').then(function (isAdminTable) {
          const arrayOfAdmins = isAdminTable.val();
          const authData = thisSaved.afa.auth.currentUser.email;
          const atSign = authData.search('@');
          const userToCheckIfAdmin = authData.slice(0, atSign);
          const isAdmin = arrayOfAdmins.hasOwnProperty(userToCheckIfAdmin);
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
    console.log('signout function called inside auth.service.ts');
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

  isAuthed() {
    console.log('isAuthed function called inside auth.service.ts');
    return !!this.authState;
  }

}
