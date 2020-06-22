import { Component, Input } from '@angular/core';

import { IListItemClinic } from '../../../shared/models/clinic.models';

@Component({
  selector: 'ngx-clinic',
  templateUrl: 'clinic.component.html'
})
export class ClinicComponent {
  @Input() clinic: IListItemClinic;
}
