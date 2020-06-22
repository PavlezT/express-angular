import { Ng2SmartTableModule } from 'ng2-smart-table';

import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { AddClinicComponent } from './add-clinic/add-clinic.component';
import { ClinicComponent } from './clinic/clinic.component';
import { ClinicsRoutingModule } from './clinics-routing.module';
import { ClinicsComponent } from './clinics.component';
import { EditClinicComponent } from './edit-clinic/edit-clinic.component';
import { ListComponent } from './list/list.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

const components = [
  ClinicsComponent,
  ListComponent,
  AddClinicComponent,
  ClinicComponent,
  EditClinicComponent
];

@NgModule({
  imports: [ThemeModule, ClinicsRoutingModule, Ng2SmartTableModule, LeafletModule],
  declarations: [...components],
})
export class ClinicsModule {}
