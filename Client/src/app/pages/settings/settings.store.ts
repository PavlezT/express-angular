import { Injectable } from '@angular/core';
import { IUpdatePathology, IUpdateMarketingItem } from '../../shared/models/settings.models';
import { SettingsService } from '../../shared/services/settings.service';
import { LoadingState } from '../../shared/models/state.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsStore {
  listPathologies: {value: {side: boolean, text: string}, editMode: boolean, id: string}[] = [];
  listRecommendations: {value: string, editMode: boolean, id: string}[] = [];
  listMarketingItems: {text: string, count: number, id: string}[] = [];
  statePathologies: LoadingState;
  stateRecommendations: LoadingState;
  stateMarketingItems: LoadingState;
  selectedArea: string;

  constructor(private settingsService: SettingsService) {}

  getAllPathologiesByArea(area: string) {
    this.listPathologies = [];
    this.statePathologies = LoadingState.loading;
    this.settingsService.getAllPathologiesByArea(area).subscribe(data => {
      if (data.length !== 0) {
        data.forEach(el => {
          this.listPathologies.push({
            value: {
              side: el.side,
              text: el.text
            },
            editMode: false,
            id: el.id
          });
        });
      } else {
        this.listPathologies = [];
      }
      this.statePathologies = LoadingState.success;
    });
  }

  getAllSurgeryRecomendations() {
    this.stateRecommendations = LoadingState.loading;
    this.settingsService.getAllSurgeryRecomendations().subscribe(data => {
      data.forEach(el => {
        this.listRecommendations.push({
          value: el.text,
          editMode: false,
          id: el.id
        });
      });
      this.stateRecommendations = LoadingState.success;
    });
  }

  getAllMarketingItems() {
    this.stateMarketingItems = LoadingState.loading;
    this.settingsService.getAllMarketingItems().subscribe(data => {
      data.forEach(el => {
        this.listMarketingItems.push({
          text: el.text,
          count: el.count,
          id: el.id
        });
      });
      this.stateMarketingItems = LoadingState.success;
    });
  }

  deletePathology(id: string) {
    this.settingsService.deletePathology(id).subscribe(() => {
      //
    });
  }

  deleteRecommendation(id: string) {
    this.settingsService.deleteRecommendation(id).subscribe(() => {
      //
    });
  }

  updatePathology(id: string, pathology: IUpdatePathology) {
    this.settingsService.editPathology(id, pathology).subscribe(() => {
      //
    });
  }

  updateRecommendation(id: string, recommendation: {text: string}) {
    this.settingsService.editSurgeryRecommendation(id, recommendation).subscribe(() => {
      //
    });
  }

  async updateMarketingItem(id: string, marketingItem: IUpdateMarketingItem) {
    return await this.settingsService.editMarketingItem(id, marketingItem).toPromise();
  }

  addPathology(pathology: IUpdatePathology) {
    this.settingsService.addPathology(pathology).subscribe((data) => {
      this.listPathologies.push({
        value: {
          side: data.side,
          text: data.text
        },
        editMode: false,
        id: data.id
      });
    });
  }

  addRecommendation(recommendation: {text: string}) {
    this.settingsService.addSurgeryRecommendation(recommendation).subscribe((data) => {
      this.listRecommendations.push({
        value: data.text,
        editMode: false,
        id: data.id
      });
    });
  }

  clearState() {
    this.statePathologies = undefined;
    this.stateRecommendations = undefined;
    this.stateMarketingItems = undefined;
    this.listMarketingItems = [];
    this.listPathologies = [];
    this.listRecommendations = [];
  }
}
