import { Injectable } from '@angular/core';

import { HttpWrapperService } from '../../@core/services/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  constructor(private httpWrapperService: HttpWrapperService) {}

  getCTSLanguages(): Observable<any> {
    return this.httpWrapperService.get(['languages']);
  }

  addCTSLocale(body: { locale: string; name: string }): Observable<any> {
    return this.httpWrapperService.post(['languages'], body);
  }

  updateCTSLanguage(locale: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('language', file, file.name);
    return this.httpWrapperService.put(['languages', locale], formData, [
      { key: 'Content-Type', value: 'multipart/form-data' },
      { key: 'Accept', value: 'application/json' }
    ]);
  }

  getCTSLanguageByLocale(locale: string): Observable<any> {
    return this.httpWrapperService.get(['languages', locale]);
  }

  deleteCTSLanguage(locale: string): Observable<void> {
    return this.httpWrapperService.delete(['languages', locale]);
  }

  // mobile

  getMobileLanguages(): Observable<any> {
    return this.httpWrapperService.get(['mobile', 'languages']);
  }

  addMobileLocale(body: { locale: string; name: string }): Observable<any> {
    return this.httpWrapperService.post(['mobile', 'languages'], body);
  }

  updateMobileLanguage(locale: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('language', file, file.name);
    return this.httpWrapperService.put(
      ['mobile', 'languages', locale],
      formData,
      [
        { key: 'Content-Type', value: 'multipart/form-data' },
        { key: 'Accept', value: 'application/json' }
      ]
    );
  }

  getMobileLanguageByLocale(locale: string): Observable<any> {
    return this.httpWrapperService.get(['mobile', 'languages', locale]);
  }

  deleteMobileLanguage(locale: string): Observable<void> {
    return this.httpWrapperService.delete(['mobile', 'languages', locale]);
  }
}
