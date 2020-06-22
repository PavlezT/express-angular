import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '../../shared/shared.module';
import { AddLocaleModalComponent } from './add-locale-modal/add-locale-modal.component';

@NgModule({
  imports: [ThemeModule, SharedModule],
  declarations: [SettingsComponent, AddLocaleModalComponent],
  entryComponents: [AddLocaleModalComponent]
})
export class SettingsModule {}
