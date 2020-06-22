import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NbDialogService,
  NbToastrService,
  NbGlobalPhysicalPosition
} from '@nebular/theme';

import { RoutingState } from '../../../@core/services/routing-state.service';
// tslint:disable-next-line:max-line-length
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { buildTableSettings } from '../../../shared/helpers/table.helpers';
import {
  ITerritory,
  TerritoryDTO
} from '../../../shared/models/territory.models';
import { TerritoriesStore } from '../../../shared/stores/territories.store';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-ba-edit-territory',
  templateUrl: './edit-territory.component.html',
  styleUrls: ['./edit-territory.component.scss']
})
export class EditTerritoryComponent implements OnInit {
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

  unitSystems = [
    { name: 'Metric', value: 'metric' },
    { name: 'Imperial', value: 'imperial' }
  ];

  territory: TerritoryDTO = TerritoryDTO.createEmptyTerritory();
  territoryId: string;

  clinics: Array<any>;

  constructor(
    private routingState: RoutingState,
    private activatedRoute: ActivatedRoute,
    private territoriesStore: TerritoriesStore,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.territoryId = this.activatedRoute.snapshot.params.territoryId;
    this.territoriesStore
      .getTerritoryById(this.territoryId)
      .subscribe((data: ITerritory<string>) => {
        this.territory = TerritoryDTO.initializeTerritory(data);
      });
    this.territoriesStore
      .getClinicsByTerrotoryId(this.territoryId)
      .subscribe(data => {
        this.clinics = data;
      });
  }

  async onItemChange() {
    try {
      await this.territoriesStore.updateTerritory(
        this.territoryId,
        this.territory
      );
      await this.showToast('Territory updated', 1000, NbToastStatus.SUCCESS);
    } catch (error) {
      await this.showToast('Error', 2000, NbToastStatus.DANGER);
    }
  }

  async handleDataUpdates(event) {
    try {
      this.territory[event.tableName] = await event.data;
      await this.territoriesStore.updateTerritory(
        this.territoryId,
        this.territory
      );
      await this.showToast('Territory updated', 1000, NbToastStatus.SUCCESS);
    } catch (error) {
      await this.showToast('Error', 2000, NbToastStatus.DANGER);
    }
  }

  async deleteTerritory() {
    this.dialogService
      .open(ConfirmationDialogComponent, {
        context: {
          itemName: `${this.territory.name} territory`
        }
      })
      .onClose.subscribe(async data => {
        if (data) {
          try {
            await this.territoriesStore.deleteTerritory(this.territoryId);
            await this.showToast(
              'Territory removed',
              2000,
              NbToastStatus.SUCCESS
            );
            this.back();
          } catch (error) {
            (error.status = 409)
              ? await this.showToast(
                  'There are clinics attached to the territory',
                  4000,
                  NbToastStatus.DANGER
                )
              : await this.showToast('Error', 2000, NbToastStatus.DANGER);
          }
        } else {
          return;
        }
      });
  }

  back() {
    this.routingState.back();
  }

  private showToast(message: string, time: number, status: NbToastStatus) {
    const config = {
      status: status,
      destroyByClick: true,
      duration: time,
      hasIcon: false,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };

    this.toastrService.show('', message, config);
  }
}
