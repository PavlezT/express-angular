import { Observable } from 'rxjs';

import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { IListItemTerritory } from '../../../shared/models/territory.models';
import { ClinicsService } from '../../../shared/services/clinics.service';
import { TerritoriesService } from '../../../shared/services/territories.service';
import { IListItemClinic } from '../../../shared/models/clinic.models';

@Component({
  selector: 'ngx-ba-assign-clinic-modal',
  templateUrl: './assign-clinic-modal.component.html',
  styleUrls: ['./assign-clinic-modal.component.scss']
})
export class AssignClinicModalComponent implements OnInit {
  @Input() clinicsAssigned: any;

  roles = [
    {
      value: 'receptionist'
    },
    {
      value: 'manager'
    },
    {
      value: 'atc'
    }
  ];

  territories$: Observable<Array<IListItemTerritory>>;
  clinics$: Observable<Array<IListItemClinic>>;

  territoryId: string;
  clinic: { name: string; id: string };
  role: string;

  constructor(
    protected ref: NbDialogRef<AssignClinicModalComponent>,
    private territoriesService: TerritoriesService,
    private clinicsService: ClinicsService
  ) {}

  ngOnInit() {
    this.territories$ = this.territoriesService.getTerritories();
  }

  isClinicAssigned(clinicId: string) {
    if (this.clinicsAssigned && this.clinicsAssigned.length) {
      return this.clinicsAssigned.find(
        (data: { clinic: { id: string; name: string } }) =>
          data.clinic.id === clinicId
      );
    }
  }

  onTerritorySelcted() {
    this.clinics$ = this.clinicsService.getClinics(this.territoryId);
  }

  dismiss() {
    if (this.clinic && this.role) {
      this.ref.close({
        clinic: this.clinic,
        role: this.role
      });
    } else {
      this.ref.close();
    }
  }
}
