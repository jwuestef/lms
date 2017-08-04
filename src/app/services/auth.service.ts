import { Injectable } from '@angular/core';
import { User } from '../models/user';

import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class FirebaseService {
    authState;

    signup(user: User) {
        this.afa.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
            this.router.navigateByUrl('/admin');
        })
        .catch((e) => {
            console.log('Error in signup function inside auth.service.ts: ');
            console.log(e);
        });
        console.log(this.isAuthed());
    }

    signin(user: User) {
        this.afa.auth.signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
            const thisSaved = this;
            this.afd.database.ref('/isAdmin').once('value').then(function(isAdminTable) {
              const arrayOfAdmins = isAdminTable.val();
              const atSign = user.email.search('@');
              const userToCheckIfAdmin = user.email.slice(0, atSign);
              const isAdmin = arrayOfAdmins.hasOwnProperty(userToCheckIfAdmin);
              if (isAdmin) {
                thisSaved.router.navigateByUrl('/admin');
              } else {
                thisSaved.router.navigateByUrl('/student');
              }
            });
        })
        .catch((e) => {
            console.log('Error in signin function inside auth.service.ts: ');
            console.log(e);
        });
    }

    signout() {
        this.afa.auth.signOut()
        .then(() => {
            localStorage.clear();
            this.router.navigateByUrl('/');
        })
        .catch((e) => {
            console.log('Error in signout function inside auth.service.ts: ');
            console.log(e);
        });
    }

    isAuthed() {
        return !!this.authState;
    }

    constructor(public afa: AngularFireAuth, public router: Router, public afd: AngularFireDatabase){
        this.afa.authState.subscribe((authState) => {
            this.authState = authState;
        });
    }
}
