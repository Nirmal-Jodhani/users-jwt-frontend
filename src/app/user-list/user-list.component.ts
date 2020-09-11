// ANGULAR 
import { Component, OnInit } from '@angular/core';

// SERVICE
import {UserService} from '../user.service';

// MODEL AND INTERFACE
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    users: User[];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getAll().subscribe(users => {
            this.users = users;
        });
    }

}
