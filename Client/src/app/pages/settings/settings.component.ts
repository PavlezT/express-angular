import { Observable } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbToastrService
} from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

import { createAndDownloadFile } from '../../shared/helpers/file.helper';
import { LoadingState } from '../../shared/models/state.model';
import { LanguagesService } from '../../shared/services/laguages.service';
import { SettingsStore } from './settings.store';
import { AddLocaleModalComponent } from './add-locale-modal/add-locale-modal.component';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./settings.component.scss'],
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {
  loadingState = LoadingState;
  addPathology: { text: string; side: boolean } = { text: '', side: false };
  surgeryRecommend: string;
  selectedArea: string;
  areas = ['Knee', 'Lower back', 'Hip', 'Foot & ankle', 'Upper back', 'Neurological condition', 'Pediatric', 'Other'];

  ctsLanguages$: Observable<any>;

  mobileLanguages$: Observable<any>;

  constructor(
    public settingsStore: SettingsStore,
    private toastrService: NbToastrService,
    private languagesService: LanguagesService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this.settingsStore.getAllMarketingItems();
    this.settingsStore.getAllSurgeryRecomendations();
    this.ctsLanguages$ = this.languagesService.getCTSLanguages();
    this.mobileLanguages$ = this.languagesService.getMobileLanguages();
  }

  addPatology() {
    this.addPathology.text &&
      this.settingsStore.addPathology({
        text: this.addPathology.text,
        side: this.addPathology.side,
        area: this.selectedArea
      });
    this.addPathology = { text: '', side: false };
  }

  addCTSLocale() {
    this.dialogService
      .open(AddLocaleModalComponent, {})
      .onClose.subscribe(data => {
        if (data) {
          this.languagesService.addCTSLocale(data).subscribe(
            () => {
              this.ctsLanguages$ = this.languagesService.getCTSLanguages();
              this.showToast(
                'Locale created',
                2000,
                NbToastStatus.SUCCESS,
                NbGlobalPhysicalPosition.BOTTOM_RIGHT
              );
            },
            () => {
              this.showToast(
                'Error',
                2000,
                NbToastStatus.DANGER,
                NbGlobalPhysicalPosition.BOTTOM_RIGHT
              );
            }
          );
        }
      });
  }

  addMobileLocale() {
    this.dialogService
      .open(AddLocaleModalComponent, {})
      .onClose.subscribe(data => {
        if (data) {
          this.languagesService.addMobileLocale(data).subscribe(
            () => {
              this.mobileLanguages$ = this.languagesService.getMobileLanguages();
              this.showToast(
                'Locale created',
                2000,
                NbToastStatus.SUCCESS,
                NbGlobalPhysicalPosition.BOTTOM_RIGHT
              );
            },
            () => {
              this.showToast(
                'Error',
                2000,
                NbToastStatus.DANGER,
                NbGlobalPhysicalPosition.BOTTOM_RIGHT
              );
            }
          );
        }
      });
  }

  downloadCTSLanguage(locale: string) {
    this.languagesService.getCTSLanguageByLocale(locale).subscribe(data => {
      createAndDownloadFile(JSON.stringify(data.body), locale);
    });
  }

  downloadMobileLanguage(locale: string) {
    this.languagesService.getMobileLanguageByLocale(locale).subscribe(data => {
      createAndDownloadFile(JSON.stringify(data.body), locale);
    });
  }

  async deleteCTSLanguage(locale: string, name: string) {
    this.dialogService
    .open(ConfirmationDialogComponent, {
      context: {
        itemName: `${name} language`
      }
    })
    .onClose.subscribe(async data => {
      if (data) {
        this.languagesService.deleteCTSLanguage(locale).subscribe(
          async () => {
            this.ctsLanguages$ = this.languagesService.getCTSLanguages();
            await this.showToast(
              'File deleted',
              2000,
              NbToastStatus.SUCCESS,
              NbGlobalPhysicalPosition.BOTTOM_RIGHT
            );
          },
          async () => {
            await this.showToast(
              'Error',
              2000,
              NbToastStatus.DANGER,
              NbGlobalPhysicalPosition.BOTTOM_RIGHT
            );
          }
        );
      } else {
        return;
      }
    });
  }

  async deleteMobileLanguage(locale: string, name: string) {
    this.dialogService
    .open(ConfirmationDialogComponent, {
      context: {
        itemName: `${name} language`
      }
    })
    .onClose.subscribe(async data => {
      if (data) {
        this.languagesService.deleteMobileLanguage(locale).subscribe(
          async () => {
            this.mobileLanguages$ = this.languagesService.getMobileLanguages();
            await this.showToast(
              'File deleted',
              2000,
              NbToastStatus.SUCCESS,
              NbGlobalPhysicalPosition.BOTTOM_RIGHT
            );
          },
          async () => {
            await this.showToast(
              'Error',
              2000,
              NbToastStatus.DANGER,
              NbGlobalPhysicalPosition.BOTTOM_RIGHT
            );
          }
        );
      } else {
        return;
      }
    });
  }

  updateCTSLanguage(event, locale: string) {
    if (event.target.files.length > 0) {
      this.languagesService
        .updateCTSLanguage(locale, <File>event.target.files[0])
        .subscribe(
          () => {
            this.ctsLanguages$ = this.languagesService.getCTSLanguages();
            this.showToast(
              'File uploaded',
              2000,
              NbToastStatus.SUCCESS,
              NbGlobalPhysicalPosition.BOTTOM_RIGHT
            );
          },
          () => {
            this.showToast(
              'Error',
              2000,
              NbToastStatus.DANGER,
              NbGlobalPhysicalPosition.BOTTOM_RIGHT
            );
          }
        );
    }
  }

  updateMobileLanguage(event, locale: string) {
    if (event.target.files.length > 0) {
      this.languagesService
        .updateMobileLanguage(locale, <File>event.target.files[0])
        .subscribe(
          () => {
            this.mobileLanguages$ = this.languagesService.getMobileLanguages();
            this.showToast(
              'File uploaded',
              2000,
              NbToastStatus.SUCCESS,
              NbGlobalPhysicalPosition.BOTTOM_RIGHT
            );
          },
          () => {
            this.showToast(
              'Error',
              2000,
              NbToastStatus.DANGER,
              NbGlobalPhysicalPosition.BOTTOM_RIGHT
            );
          }
        );
    }
  }

  addRecommendation() {
    this.surgeryRecommend &&
      this.settingsStore.addRecommendation({ text: this.surgeryRecommend });
    this.surgeryRecommend = '';
  }

  async deletePathology(i, arr, id: string, pathologyName: string) {
    this.dialogService
    .open(ConfirmationDialogComponent, {context: {
      itemName: `${pathologyName} pathology`
    }})
    .onClose.subscribe(async data => {
      if (data) {
        try {
          await this.deleteItem(i, arr);
          await this.settingsStore.deletePathology(id);
          await this.showToast(
              'Pathology removed',
              2000,
              NbToastStatus.SUCCESS
            );
          } catch (err) {
            await this.showToast('Error', 2000, NbToastStatus.DANGER);
          }
        } else {
          return;
        }
      });
  }

  deleteRecommendation(i, arr, id: string) {
    this.dialogService
      .open(ConfirmationDialogComponent, { context: { itemName: arr[i].value } })
      .onClose.subscribe(async data => {
        if (data) {
          this.deleteItem(i, arr);
          this.settingsStore.deleteRecommendation(id);
          await this.showToast(
            'Surgery recommendation deleted',
            2000,
            NbToastStatus.SUCCESS
          );
        } else {
          return;
        }
      });
  }

  deleteItem(i, arr) {
    arr.splice(i, 1);
  }

  onAreaSelected() {
    this.settingsStore.selectedArea = this.selectedArea;
    this.settingsStore.getAllPathologiesByArea(this.selectedArea);
  }

  updatePathology(pathology: {
    value: { side: boolean; text: string };
    editMode: boolean;
    id: string;
  }) {
    pathology.editMode = false;
    this.settingsStore.updatePathology(pathology.id, {
      text: pathology.value.text,
      side: pathology.value.side,
      area: this.selectedArea
    });
  }

  updateRecommendation(recommendation: {
    value: string;
    editMode: boolean;
    id: string;
  }) {
    recommendation.editMode = false;
    this.settingsStore.updateRecommendation(recommendation.id, {
      text: recommendation.value
    });
  }

  async updateMarketingItem(marketingItem: {
    text: string;
    count: string;
    id: string;
  }) {
    try {
      await this.settingsStore.updateMarketingItem(marketingItem.id, {
        text: marketingItem.text,
        count: marketingItem.count
      });
      await this.showToast(
        'Marketing item successfully updeted',
        2000,
        NbToastStatus.SUCCESS
      );
    } catch {
      await this.showToast('Error', 2000, NbToastStatus.DANGER);
    }
  }

  private showToast(
    message: string,
    time: number,
    status: NbToastStatus,
    position = NbGlobalPhysicalPosition.TOP_RIGHT
  ) {
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

  ngOnDestroy() {
    this.settingsStore.clearState();
  }
}
