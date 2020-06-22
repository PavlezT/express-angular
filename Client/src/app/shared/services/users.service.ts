import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { HttpWrapperService } from '../../@core/services/http.service';
import { IListItemUser, IUser } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpWrapperService: HttpWrapperService) {}

  getUsers(id: string = ''): Observable<Array<IListItemUser>> {
    return this.httpWrapperService.get(['user', 'all', id]);
  }

  getUserById(id: string): Observable<IUser> {
    return this.httpWrapperService.get(['user', id]);
  }

  updateUser(id: string, body: any): Observable<any> {
    return this.httpWrapperService.put(['user', id], body, [
      { key: 'Content-Type', value: 'application/json' }
    ]);
  }

  deleteUser(id: string): Observable<any> {
    return this.httpWrapperService.delete(['user', id]);
  }

  createUser(body: any): Observable<any> {
    return this.httpWrapperService.post(['user'], body, [
      { key: 'Content-Type', value: 'application/json' }
    ]);
  }
}
