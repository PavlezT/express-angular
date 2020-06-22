import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { IListItemTerritory } from '../../../shared/models/territory.models';
import { TerritoriesService } from '../../../shared/services/territories.service';

@Component({
  selector: 'ngx-ba-list',
  templateUrl: './list.component.html',
  styles: [
    `
      nb-card {
        transform: translate3d(0, 0, 0);
      }
    `
  ]
})
export class ListComponent implements OnInit {
  territories$: Observable<Array<IListItemTerritory>>;

  constructor(private territoriesService: TerritoriesService) {}

  ngOnInit() {
    this.territories$ = this.territoriesService.getTerritories();
  }
}
