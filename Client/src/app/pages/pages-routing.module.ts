import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { SettingsComponent } from './settings/settings.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'settings',
        component: SettingsComponent
      },
      // {
      //   path: 'iot-dashboard',
      //   component: DashboardComponent
      // },
      // {
      //   path: 'dashboard',
      //   component: ECommerceComponent
      // },
      {
        path: 'territories',
        loadChildren: './territories/territories.module#TerritoriesModule'
      },
      {
        path: 'clinics',
        loadChildren: './clinics/clinics.module#ClinicsModule'
      },
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule'
      },
      // {
      //   path: 'auth',
      //   loadChildren: './login/login.module#LoginModule'
      // },
      {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule'
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
