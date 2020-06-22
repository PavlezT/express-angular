import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { IListItemClinic } from '../../../shared/models/clinic.models';
import { IListItemTerritory } from '../../../shared/models/territory.models';
import { ClinicsService } from '../../../shared/services/clinics.service';
import { TerritoriesService } from '../../../shared/services/territories.service';

@Component({
  selector: 'ngx-bo-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  clinics$: Observable<Array<IListItemClinic>>;
  territories$: Observable<Array<IListItemTerritory>>;

  territoryId: string;

  constructor(
    private clinicsService: ClinicsService,
    private territoriesService: TerritoriesService
  ) {}

  ngOnInit() {
    this.territories$ = this.territoriesService.getTerritories();
  }

  onChange($event) {
    this.clinics$ = this.clinicsService.getClinics($event);
  }
}
