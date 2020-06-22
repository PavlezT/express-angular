import { Ng2SmartTableModule } from 'ng2-smart-table';

import { NgModule } from '@angular/core';

import { SmartTableComponent } from './components/smart-table/smart-table.component';
import { NbDialogModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

const COMPONENTS = [SmartTableComponent, ConfirmationDialogComponent];

const ENTRY_COMPONENTS = [ConfirmationDialogComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [Ng2SmartTableModule, NbDialogModule.forChild(), ThemeModule],
  exports: [...COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS]
})
export class SharedModule {}
