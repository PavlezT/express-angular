import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddClinicComponent } from './add-clinic/add-clinic.component';
import { ClinicsComponent } from './clinics.component';
import { EditClinicComponent } from './edit-clinic/edit-clinic.component';

const routes: Routes = [
  {
    path: '',
    component: ClinicsComponent
  },
  {
    path: 'add-clinic',
    component: AddClinicComponent
  },
  {
    path: 'edit-clinic/:id',
    component: EditClinicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicsRoutingModule {}
