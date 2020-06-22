import { Component, OnInit } from '@angular/core';

import { RoutingState } from '../../../@core/services/routing-state.service';
import { buildTableSettings } from '../../../shared/helpers/table.helpers';
import {
  TerritoryDTO,
  ITableData,
  ITerritory
} from '../../../shared/models/territory.models';
import { TerritoriesStore } from '../../../shared/stores/territories.store';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-ba-add-territory',
  templateUrl: './add-territory.component.html',
  styleUrls: ['./add-territory.component.scss']
})
export class AddTerritoryComponent implements OnInit {
  readonly referralSettings = buildTableSettings(
    { add: true, edit: true, delete: true },
    {
      source: {
        title: 'Where did you hear about us',
        type: 'string',
        filter: false
      }
    }
  );

  readonly paymentTypeSettings = buildTableSettings(
    { add: true, edit: true, delete: true },
    {
      source: {
        title: 'Payment Types',
        type: 'string',
        filter: false
      }
    }
  );

  readonly activityStatusSettings = buildTableSettings(
    { add: false, edit: true, delete: false },
    {
      source: {
        title: 'Activity Statuses',
        type: 'string',
        filter: false
      }
    }
  );

  readonly supportedPackagesSettings = buildTableSettings(
    { add: true, edit: true, delete: true },
    {
      source: {
        title: 'Supported Packages',
        type: 'string',
        filter: false
      }
    }
  );

  readonly dropOutReasonsSettings = buildTableSettings(
    { add: true, edit: true, delete: true },
    {
      source: {
        title: 'Drop Out Reasons',
        type: 'string',
        filter: false
      }
    }
  );

  readonly insurersListSettings = buildTableSettings(
    { add: true, edit: true, delete: true },
    {
      source: {
        title: 'Insurers',
        type: 'string',
        filter: false
      }
    }
  );

  readonly unitSystems = [
    { name: 'Metric', value: 'metric' },
    { name: 'Imperial', value: 'imperial' }
  ];

  readonly territory: TerritoryDTO = TerritoryDTO.createNewTerritory();

  activityStatuses: Array<ITableData>;

  constructor(
    private routingState: RoutingState,
    private territoriesStore: TerritoriesStore,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.territoriesStore.getActivityStatuses().subscribe(data => {
      this.territory.setActivityStatuses = data;
    });
  }

  handleDataUpdates(event) {
    this.territory[event.tableName] = event.data;
  }

  async createTerritory() {
    const newTerritory: ITerritory<
      string
    > = await this.territoriesStore.createTerritory(this.territory);
    await this.showToast();
    await this.navigate(`/pages/territories/edit-territory/${newTerritory.id}`);
  }

  isCreateDisabled(): boolean {
    return <boolean>(
      (<unknown>(
        !(this.territory.name.length && this.territory.unitSystem.length)
      ))
    );
  }

  navigate(url: string) {
    this.routingState.navigate(url);
  }

  back() {
    this.routingState.back();
  }

  private showToast() {
    const config = {
      status: NbToastStatus.SUCCESS,
      destroyByClick: true,
      duration: 2000,
      hasIcon: false,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };

    this.toastrService.show('', `Territory created`, config);
  }
}
