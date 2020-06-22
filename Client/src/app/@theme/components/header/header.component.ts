import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';

import { SessionStore } from '../../../shared/stores/session.store';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Log out' }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    public sessionStore: SessionStore
  ) {}

  ngOnInit() {
    this.onLogoutClick();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }


  private onLogoutClick() {
    this.menuService.onItemClick().subscribe(el => {
      if (el.item.title === 'Log out') {
        this.sessionStore.logout();
      }
    });
  }
}
