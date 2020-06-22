import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-territory',
  templateUrl: 'territory.component.html'
})
export class TerritoryComponent {
  @Input() territory: any;
}

