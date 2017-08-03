// import { SigninComponent } from '../signin/signin.component';
// import { SignupComponent } from '../signup/signup.component';
// import { MyprofileComponent } from '../myprofile/myprofile.component'
// import { MatchesComponent } from '../matches/matches.component';
// import { SplashComponent } from '../splash/splash.component';
// import { PublicprofileComponent } from '../publicprofile/publicprofile.component';
// import { MessageComponent } from '../message/message.component';
import { LoginComponent } from '../login/login.component';
import { AdminComponent } from '../admin/admin.component';
import { StudentComponent } from '../student/student.component';

export const routes = [
      {
        path: 'student',
        component: StudentComponent
      },
      {
          path: 'admin',
          component: AdminComponent
      },
      {
          path: '',
          component: LoginComponent
     }
]
