import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { HttpWrapperService } from '../../@core/services/http.service';
import {
  IListItemTerritory,
  ITerritory,
  IActivityStatus
} from '../models/territory.models';

@Injectable({
  providedIn: 'root'
})
export class TerritoriesService {
  constructor(private httpWrapperService: HttpWrapperService) {}

  getTerritories(): Observable<Array<IListItemTerritory>> {
    return this.httpWrapperService.get(['territories']);
  }

  getTerritoryById(id: string): Observable<ITerritory<string>> {
    return this.httpWrapperService.get(['territories', id]);
  }

  updateTerritory(id: string, body: ITerritory<string>): Observable<any> {
    return this.httpWrapperService.put(['territories', id], body, [
      { key: 'Content-Type', value: 'application/json' }
    ]);
  }

  deleteTerritory(id: string): Observable<any> {
    return this.httpWrapperService.delete(['territories', id]);
  }

  createTerritory(body: ITerritory<string>): Observable<any> {
    return this.httpWrapperService.post(['territories'], body, [
      { key: 'Content-Type', value: 'application/json' }
    ]);
  }

  getActivityStatuses(): Observable<Array<IActivityStatus>> {
    return this.httpWrapperService.get(['activity-status']);
  }
}
