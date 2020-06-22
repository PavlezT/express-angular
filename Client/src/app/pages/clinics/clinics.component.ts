import { Component } from '@angular/core';

@Component({
  selector: 'ngx-bo-clinics',
  template: `
    <router-outlet></router-outlet>
    <div class="button-container">
      <button
        nbButton
        shape="rectangle"
        status="success"
        class="btn-demo"
        routerLink="/pages/clinics/add-clinic"
      >
        Add clinic
      </button>
    </div>
    <ngx-bo-list></ngx-bo-list>
  `,
  styles: [
    `
      .button-container {
        margin-bottom: 20px;
      }
    `
  ]
})
export class ClinicsComponent {}
