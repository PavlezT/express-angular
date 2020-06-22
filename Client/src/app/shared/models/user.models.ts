import { IListItemClinic } from './clinic.models';

export interface IListItemUser {
  clinics: Array<IListItemClinic>;
  id: string;
  name: string;
}

export interface IUser {
  clinics: Array<IListItemClinic>;
  email: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  status: string;
  id: string;
}
