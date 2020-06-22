import { Injectable } from '@angular/core';
import { ClinicsService } from '../../shared/services/clinics.service';
import { IClinicEdit } from '../../shared/models/clinic.models';

@Injectable({
    providedIn: 'root'
})
export class ClinicService {
  constructor(private clinicsService: ClinicsService) {}

  async addClinic(clinic: IClinicEdit): Promise<any> {
    return await this.clinicsService.addClinic(clinic).toPromise();
  }

  async editClinic(id: string, clinic: IClinicEdit): Promise<any> {
    return await this.clinicsService.editClinic(id, clinic).toPromise();
  }

  async deleteClinic(id: string): Promise<any> {
    return await this.clinicsService.deleteClinic(id).toPromise();
  }
}
