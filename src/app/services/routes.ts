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
