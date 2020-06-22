import { filter } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RoutingState {
  private history = [];

  constructor(private router: Router, private location: Location) {}

  loadRouting(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        this.history = [...this.history, urlAfterRedirects];
      });
  }

  getHistory(): string[] {
    return this.history;
  }

  getPreviousUrl(options = 2): string {
    return this.history[this.history.length - options] || '/';
  }

  back() {
    this.location.back();
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
}
