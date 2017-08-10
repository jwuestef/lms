// this is a storage location for variables that need to be accessed by multiple components

import { Injectable } from '@angular/core';


@Injectable()
export class StudentService {
    studentArray = [];
    isAdmin: boolean;
}
