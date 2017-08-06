import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {

  constructor(public router: Router, public afd: AngularFireDatabase) {
        const thisSaved = this;
        this.afd.database.ref('/isAdmin').once('value').then(function(isAdminTable) {
          const arrayOfAdmins = isAdminTable.val();
          const userEmail = localStorage.getItem('userEmail');
          const atSign = userEmail.search('@');
          const userToCheckIfAdmin = userEmail.slice(0, atSign);
          const isAdmin = arrayOfAdmins.hasOwnProperty(userToCheckIfAdmin);
          if (!isAdmin) {
            thisSaved.router.navigateByUrl('/student');
          }
        });
  }


}
