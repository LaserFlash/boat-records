import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/objects/user';
import { UserManagementService } from '../../shared/user-management/user-management.service';
@Component({
  selector: 'elevate-user',
  templateUrl: './elevate-user.component.html',
  styleUrls: ['./elevate-user.component.css']
})
export class ElevateUserComponent implements OnInit {

  users: User[];
  usersRole: boolean[];

  constructor(private USERS: UserManagementService) { }

  ngOnInit() {
    this.USERS.users.subscribe(usersDB => {
      this.users = usersDB;
      this.usersRole = this.users.map(user => user.role === 'admin' || user.role === 'system-admin');
    });
  }

  save(index: number) {
    if (this.usersRole[index]) {
      this.USERS.upgradeToAdmin(this.users[index].id);
    } else {
      this.USERS.downgradeToUser(this.users[index].id);
    }
  }

}
