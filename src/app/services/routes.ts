import { LoginComponent } from '../login/login.component';
import { AdminComponent } from '../admin/admin.component';
import { StudentComponent } from '../student/student.component';
import { EventFormComponent } from '../event-form/event-form.component';


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
  },
  {
    path: '**', redirectTo: '/'
  }
];
