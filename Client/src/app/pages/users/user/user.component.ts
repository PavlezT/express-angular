import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-user',
  templateUrl: 'user.component.html'
})
export class UserComponent {
  @Input() user: any;
}
