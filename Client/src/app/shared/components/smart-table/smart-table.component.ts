import { LocalDataSource } from 'ng2-smart-table';

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'ngx-bo-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [
    `
      nb-card {
        transform: translate3d(0, 0, 0);
      }
    `
  ]
})
export class SmartTableComponent implements OnChanges {
  @Input() settings: any;
  @Input() tableData: Array<any>;
  @Input() tableName: string;
  @Input() itemName: string;

  @Output() onTableDataUpdated = new EventEmitter();

  source: LocalDataSource = new LocalDataSource();

  constructor(private dialogService: NbDialogService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.tableData && this.tableData.length) {
      this.tableData.forEach(el => {
        this.source.remove(el);
      });
      changes.tableData.currentValue.forEach(el => {
        this.source.append(el).then(() => {
          this.source.setPage(1);
        });
      });
    }
  }

  onDeleteConfirm(event) {
    this.dialogService
      .open(ConfirmationDialogComponent, {
        context: {
          itemName: this.itemName
        }
      })
      .onClose.subscribe(async data => {
        if (data) {
          await event.confirm.resolve();
          this.onTableDataUpdated.emit({
            data: event.source.data,
            tableName: this.tableName
          });
        } else {
          await event.confirm.reject();
        }
      });
  }

  async onCreateConfirm(event) {
    await event.confirm.resolve();
    this.onTableDataUpdated.emit({
      data: event.source.data,
      tableName: this.tableName
    });
  }

  async onSaveConfirm(event) {
    await event.confirm.resolve();
    this.onTableDataUpdated.emit({
      data: event.source.data,
      tableName: this.tableName
    });
  }
}
