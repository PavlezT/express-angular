import { Ng2SmartTableModule } from 'ng2-smart-table';

import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListComponent } from './list/list.component';
import { UserComponent } from './user/user.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../../shared/shared.module';
import { AssignClinicModalComponent } from './assign-clinic-modal/assign-clinic-modal.component';
import {NgxMaskModule} from 'ngx-mask';

const COMPONENTS = [
  UsersComponent,
  ListComponent,
  AddUserComponent,
  UserComponent,
  EditUserComponent,
  AssignClinicModalComponent
];

const MODULES = [
  ThemeModule,
  UsersRoutingModule,
  Ng2SmartTableModule,
  SharedModule,
  NgxMaskModule.forRoot()
];

@NgModule({
  imports: [...MODULES],
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS],
})
export class UsersModule {}
