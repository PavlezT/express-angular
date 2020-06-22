import { Ng2SmartTableModule } from 'ng2-smart-table';

import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { AddTerritoryComponent } from './add-territory/add-territory.component';
import { EditTerritoryComponent } from './edit-territory/edit-territory.component';
import { ListComponent } from './list/list.component';
import { TerritoriesRoutingModule } from './territories-routing.module';
import { TerritoriesComponent } from './territories.component';
import { TerritoryComponent } from './territory/territory.component';

const components = [
  TerritoriesComponent,
  ListComponent,
  AddTerritoryComponent,
  TerritoryComponent,
  EditTerritoryComponent
];

@NgModule({
  imports: [
    ThemeModule,
    TerritoriesRoutingModule,
    Ng2SmartTableModule,
    SharedModule
  ],
  declarations: [...components],
})
export class TerritoriesModule {}
