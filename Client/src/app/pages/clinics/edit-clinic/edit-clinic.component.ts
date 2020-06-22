import * as L from 'leaflet';
import { Observable, Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NbDialogService,
  NbToastrService,
  NbGlobalPhysicalPosition
} from '@nebular/theme';

import { RoutingState } from '../../../@core/services/routing-state.service';
// tslint:disable-next-line:max-line-length
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ClinicEdit, IClinic } from '../../../shared/models/clinic.models';
import { LoadingState } from '../../../shared/models/state.model';
import { IListItemTerritory } from '../../../shared/models/territory.models';
import { ClinicsService } from '../../../shared/services/clinics.service';
import { TerritoriesService } from '../../../shared/services/territories.service';
import { ClinicService } from '../clinic.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

export enum ProfileOptions {
  compliance = 'Comprehensive questionnaire compliance',
  requirements = 'Minimum requirements'
}

@Component({
  selector: 'ngx-bo-edit-clinic',
  templateUrl: './edit-clinic.component.html',
  styleUrls: ['./edit-clinic.component.scss']
})
export class EditClinicComponent implements OnInit, OnDestroy {
  clinic: IClinic;
  clinicSub: Subscription;
  loadingState = LoadingState;
  state: LoadingState = LoadingState.loading;
  territories$: Observable<IListItemTerritory[]>;
  options: any;
  layers = [];
  profileOptions = Object.values(ProfileOptions);

  myIcon = L.icon({
    iconUrl: '../../../../assets/images/marker-icon-2x.png',
    // shadowUrl: '../../../../assets/images/marker-shadow.png',
    iconSize: [25, 40], // size of the icon
    // shadowSize: [25, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    // shadowAnchor: [10, 120], // the same for the shadow
    popupAnchor: [-3, -76] // point
  });

  constructor(
    private routingState: RoutingState,
    private clinicService: ClinicService,
    private clinicsService: ClinicsService,
    private activatedRoute: ActivatedRoute,
    private dialogService: NbDialogService,
    public territoriesService: TerritoriesService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.territories$ = this.territoriesService.getTerritories();
    this.clinicSub = this.clinicsService
      .getClinicById(this.activatedRoute.snapshot.params['id'])
      .subscribe(
        (clinic: IClinic) => {
          this.clinic = clinic;
          this.layers.push(
            L.marker([clinic.latitude, clinic.longitude], {
              draggable: true,
              icon: this.myIcon
            }).on('dragend', e => {
              this.clinic.latitude = e.target.getLatLng().lat;
              this.clinic.longitude = e.target.getLatLng().lng;
            })
          );
          this.options = {
            layers: [
              L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
            ],
            zoom: 3,
            center: L.latLng(clinic.latitude, clinic.longitude)
          };
          this.state = LoadingState.success;
        },
        () => {
          this.state = LoadingState.error;
        }
      );
  }

  back() {
    this.routingState.back();
  }

  async editClinic() {
    try {
      await this.clinicService.editClinic(
        this.clinic.id,
        new ClinicEdit(this.clinic)
      );
      await this.showToast(
        'Clinic successfully edited!',
        2000,
        NbToastStatus.SUCCESS
      );
    } catch {
      await this.showToast('Error', 2000, NbToastStatus.DANGER);
    }
  }

  findObjectKeyByValue(value: ProfileOptions) {
    return Object.keys(ProfileOptions).find(el => ProfileOptions[el] === value);
  }

  onLongitudeChanged(lng) {
    this.layers.splice(0, 1,
      L.marker([this.clinic.latitude, Number(lng)], {
        draggable: true,
        icon: this.myIcon
      }).on('dragend', e => {
        this.clinic.latitude = e.target.getLatLng().lat;
        this.clinic.longitude = e.target.getLatLng().lng;
      })
    );
  }

  onLatitudeChanged(lat) {
    this.layers.splice(0, 1,
      L.marker([Number(lat), this.clinic.longitude], {
        draggable: true,
        icon: this.myIcon
      }).on('dragend', e => {
        this.clinic.latitude = e.target.getLatLng().lat;
        this.clinic.longitude = e.target.getLatLng().lng;
      })
    );
  }

  territoryChange(territory: IListItemTerritory) {
    this.clinic.territory.id = territory.id;
    this.clinic.territory.name = territory.name;
  }

  deleteClinic() {
    this.dialogService
      .open(ConfirmationDialogComponent, {
        context: {
          itemName: `${this.clinic.name} clinic`
        }
      })
      .onClose.subscribe(async data => {
        if (data) {
          try {
            await this.clinicService.deleteClinic(this.clinic.id);
            await this.showToast(
              'Clinic successfully deleted!',
              2000,
              NbToastStatus.SUCCESS
            );
            this.back();
          } catch {
            await this.showToast('Error', 2000, NbToastStatus.DANGER);
          }
        }
      });
  }

  ngOnDestroy() {
    this.clinicSub.unsubscribe();
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
