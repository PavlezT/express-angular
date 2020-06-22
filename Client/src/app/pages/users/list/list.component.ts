import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../../shared/services/users.service';
import { IListItemUser } from '../../../shared/models/user.models';

@Component({
  selector: 'ngx-ba-list',
  templateUrl: './list.component.html',
  styles: [
    `
      nb-card {
        transform: translate3d(0, 0, 0);
      }
    `
  ]
})
export class ListComponent implements OnInit {
  users$: Observable<Array<IListItemUser>>;
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.users$ = this.usersService.getUsers();
  }
}
