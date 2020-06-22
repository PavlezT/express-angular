import { IListItemTerritory } from './territory.models';

export interface IListItemClinic {
  name: string;
  territory?: IListItemTerritory;
  id: string;
}

export interface IClinic {
  name: string;
  country: string;
  city: string;
  profile: string;
  street: string;
  latitude: number;
  longitude: number;
  territory: IListItemTerritory;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IClinicEdit {
  name: string;
  country: string;
  city: string;
  street: string;
  latitude: number;
  longitude: number;
  territory: string;
  profile: string;
}

export class ClinicEdit {
  name: string;
  country: string;
  city: string;
  street: string;
  latitude: number;
  longitude: number;
  territory: string;
  profile: string;
  constructor(data?: IClinic) {
    this.name = data ? data.name : '';
    this.city = data ? data.city : '';
    this.country = data ? data.country : '';
    this.street = data ? data.street : '';
    this.latitude = data ? data.latitude : 46.879966;
    this.longitude = data ? data.longitude : -121.726909;
    this.territory = data ? data.territory.id : '';
    this.profile = data ? data.profile : '';
  }
}

