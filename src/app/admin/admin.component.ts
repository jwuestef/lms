import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {

  constructor(public router: Router, public afd: AngularFireDatabase, public afa: AngularFireAuth) {
        const thisSaved = this;
        this.afd.database.ref('/isAdmin').once('value').then(function(isAdminTable) {
          const arrayOfAdmins = isAdminTable.val();
          const authData = thisSaved.afa.auth.currentUser.email;
          const atSign = authData.search('@');
          const userToCheckIfAdmin = authData.slice(0, atSign);
          const isAdmin = arrayOfAdmins.hasOwnProperty(userToCheckIfAdmin);
          if (!isAdmin) {
            thisSaved.router.navigateByUrl('/student');
          }
        });
  }


}
