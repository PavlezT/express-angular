import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-confirmation-dialog',
  templateUrl: 'confirmation-dialog.component.html',
  styleUrls: ['confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  @Input() itemName: string;

  constructor(protected ref: NbDialogRef<ConfirmationDialogComponent>) {}

  dismiss(data: boolean) {
    this.ref.close(data);
  }
}
