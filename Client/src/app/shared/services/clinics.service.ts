import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { HttpWrapperService } from '../../@core/services/http.service';
import { IListItemClinic, IClinicEdit } from '../models/clinic.models';

@Injectable({
  providedIn: 'root'
})
export class ClinicsService {
  constructor(private httpWrapperService: HttpWrapperService) {}

  getClinics(id: string = ''): Observable<Array<IListItemClinic>> {
    return this.httpWrapperService.get(['clinic', 'all', id]);
  }

  getClinicById(id: string): Observable<any> {
    return this.httpWrapperService.get(['clinic', id]);
  }

  editClinic(id: string, clinic: IClinicEdit): Observable<any> {
    return this.httpWrapperService.put(['clinic', id], clinic);
  }

  addClinic(clinic: IClinicEdit): Observable<any> {
    return this.httpWrapperService.post(['clinic'], clinic);
  }

  deleteClinic(id: string): Observable<any> {
    return this.httpWrapperService.delete(['clinic', id]);
  }
}
