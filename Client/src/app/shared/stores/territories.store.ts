import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import {
  ITerritory,
  TerritoryDTO,
  IActivityStatus
} from '../models/territory.models';
import { TerritoriesService } from '../services/territories.service';
import { ClinicsService } from '../services/clinics.service';

@Injectable({
  providedIn: 'root'
})
export class TerritoriesStore {
  constructor(
    private territoriesService: TerritoriesService,
    private clinicsService: ClinicsService
  ) {}

  getClinicsByTerrotoryId(id: string): Observable<any> {
    return this.clinicsService.getClinics(id);
  }

  getTerritoryById(id: string): Observable<ITerritory<string>> {
    return this.territoriesService.getTerritoryById(id);
  }

  async updateTerritory(id: string, territory: TerritoryDTO): Promise<any> {
    const body = territory.formatForUpdate();
    return await this.territoriesService.updateTerritory(id, body).toPromise();
  }

  async deleteTerritory(id: string): Promise<any> {
    return await this.territoriesService.deleteTerritory(id).toPromise();
  }

  async createTerritory(territory: TerritoryDTO): Promise<any> {
    const body = territory.formatForCreate();
    return await this.territoriesService.createTerritory(body).toPromise();
  }

  getActivityStatuses(): Observable<Array<IActivityStatus>> {
    return this.territoriesService.getActivityStatuses();
  }
}
