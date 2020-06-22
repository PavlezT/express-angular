
import { Injectable } from '@angular/core';
import { HttpWrapperService } from '../../@core/services/http.service';
import { Observable } from 'rxjs';
import {
  IListItemPathology,
  IListSurgeryItem,
  IListMarketingItem,
  IUpdatePathology,
  IUpdateMarketingItem
} from '../models/settings.models';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private httpWrapperService: HttpWrapperService) {}

  getAllPathologiesByArea(area: string): Observable<IListItemPathology[]> {
    return this.httpWrapperService.get(['settings', 'pathologies', area]);
  }

  getAllSurgeryRecomendations(): Observable<IListSurgeryItem[]> {
    return this.httpWrapperService.get(['settings', 'surgery', 'all']);
  }

  getAllMarketingItems(): Observable<IListMarketingItem[]> {
    return this.httpWrapperService.get(['settings', 'marketingitems', 'all']);
  }

  editPathology(id: string, pathology: IUpdatePathology): Observable<IListItemPathology> {
    return this.httpWrapperService.put(['settings', 'pathologies', id], pathology);
  }

  addPathology(pathology: IUpdatePathology): Observable<IListItemPathology> {
    return this.httpWrapperService.post(['settings', 'pathologies'], pathology);
  }

  deletePathology(id: string): Observable<void> {
    return this.httpWrapperService.delete(['settings', 'pathologies', id]);
  }

  editSurgeryRecommendation(id: string, recommendation: {text: string}): Observable<IListSurgeryItem> {
    return this.httpWrapperService.put(['settings', 'surgery', id], recommendation);
  }

  editMarketingItem(id: string, marketingItem: IUpdateMarketingItem): Observable<IUpdateMarketingItem> {
    return this.httpWrapperService.put(['settings', 'marketingitems', id], marketingItem);
  }

  addSurgeryRecommendation(recommendation: {text: string}): Observable<IListSurgeryItem> {
    return this.httpWrapperService.post(['settings', 'surgery'], recommendation);
  }

  deleteRecommendation(id: string): Observable<void> {
    return this.httpWrapperService.delete(['settings', 'surgery', id]);
  }
}
