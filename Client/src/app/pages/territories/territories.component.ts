import { Component } from '@angular/core';

@Component({
  selector: 'ngx-bo-territories',
  template: `
    <router-outlet></router-outlet>
    <div class="button-container">
      <button
        nbButton
        shape="rectangle"
        status="success"
        class="btn-demo"
        routerLink="/pages/territories/add-territory"
      >
        Add territory
      </button>
    </div>

    <ngx-ba-list></ngx-ba-list>
  `,
  styles: [
    `
      .button-container {
        margin-bottom: 20px;
      }
    `
  ]
})
export class TerritoriesComponent {}
