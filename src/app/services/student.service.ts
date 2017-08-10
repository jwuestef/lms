import { Injectable } from '@angular/core';


@Injectable()
export class StudentService {
  // This is a storage location for variables that need to be accessed by multiple components
  studentArray = [];
  isAdmin: boolean;
}
