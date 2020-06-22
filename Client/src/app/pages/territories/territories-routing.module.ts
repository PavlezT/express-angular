import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddTerritoryComponent } from './add-territory/add-territory.component';
import { TerritoriesComponent } from './territories.component';
import { EditTerritoryComponent } from './edit-territory/edit-territory.component';

const routes: Routes = [
  {
    path: '',
    component: TerritoriesComponent
  },
  {
    path: 'add-territory',
    component: AddTerritoryComponent
  },
  {
    path: 'edit-territory/:territoryId',
    component: EditTerritoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerritoriesRoutingModule {}
