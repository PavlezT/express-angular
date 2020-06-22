import 'style-loader!leaflet/dist/leaflet.css';

import * as L from 'leaflet';

import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { RoutingState } from '../../../@core/services/routing-state.service';
import {
  ClinicEdit,
  IClinicEdit,
  IClinic
} from '../../../shared/models/clinic.models';
import { IListItemTerritory } from '../../../shared/models/territory.models';
import { TerritoriesService } from '../../../shared/services/territories.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ClinicService } from '../clinic.service';
import { ProfileOptions } from '../edit-clinic/edit-clinic.component';

@Component({
  selector: 'ngx-ba-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.scss']
})
export class AddClinicComponent implements OnInit {
  clinic: IClinicEdit = new ClinicEdit();
  currentTerritoryId: string;
  territories$: Observable<IListItemTerritory[]>;
  profileOptions = Object.values(ProfileOptions);

  options = {
    layers: [L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')],
    zoom: 3,
    center: L.latLng(this.clinic.latitude, this.clinic.longitude)
  };

  myIcon = L.icon({
    iconUrl: '../../../../assets/images/marker-icon-2x.png',
    // shadowUrl: '../../../../assets/images/marker-shadow.png',
    iconSize: [25, 40], // size of the icon
    // shadowSize: [25, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    // shadowAnchor: [10, 120], // the same for the shadow
    popupAnchor: [-3, -76] // point
  });

  layers = [
    L.marker([this.clinic.latitude, this.clinic.longitude], {
      draggable: true,
      icon: this.myIcon,
      clickable: true
    }).on('dragend', e => {
      this.clinic.latitude = e.target.getLatLng().lat;
      this.clinic.longitude = e.target.getLatLng().lng;
    })
  ];

  constructor(
    private routingState: RoutingState,
    private clinicService: ClinicService,
    public territoriesService: TerritoriesService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.territories$ = this.territoriesService.getTerritories();
  }

  async addClinic() {
    try {
      await this.clinicService
        .addClinic(this.clinic)
        .then((clinic: IClinic) => {
          this.routingState.navigate(`/pages/clinics/edit-clinic/${clinic.id}`);
        });
      await this.showToast(
        'Clinic successfully added!',
        2000,
        NbToastStatus.SUCCESS
      );
      this.clearFormFields();
    } catch {
      await this.showToast('Error', 2000, NbToastStatus.DANGER);
    }
  }

  get isButtonDisabled(): boolean {
    return (
      !this.clinic.name.length ||
      !this.clinic.city.length ||
      !this.clinic.city.length ||
      !this.clinic.country.length ||
      !this.clinic.street.length ||
      !this.clinic.territory.length ||
      !this.clinic.profile.length
    );
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

  back() {
    this.routingState.back();
  }

  territoryChange(territory: IListItemTerritory) {
    this.clinic.territory = territory.id;
  }

  findObjectKeyByValue(value: ProfileOptions) {
    return Object.keys(ProfileOptions).find(el => ProfileOptions[el] === value);
  }

  clearFormFields() {
    this.clinic = new ClinicEdit();
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
