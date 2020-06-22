import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbToastrService
} from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

import { RoutingState } from '../../../@core/services/routing-state.service';
import { ValidationHelper } from '../../../@core/utils/validators';
// tslint:disable-next-line:max-line-length
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { IUser } from '../../../shared/models/user.models';
import { UsersService } from '../../../shared/services/users.service';
import { AssignClinicModalComponent } from '../assign-clinic-modal/assign-clinic-modal.component';

@Component({
  selector: 'ngx-ba-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editUserFormGroup: FormGroup;
  userId: string;

  clinicsAssigned: any;

  statuses = [
    { key: 'pending', value: 'Pending' },
    { key: 'validated', value: 'Validated' },
    { key: 'active', value: 'Active' }
  ];

  constructor(
    private routingState: RoutingState,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this.initForm();
    this.userId = this.activatedRoute.snapshot.params.userId;
    this.usersService.getUserById(this.userId).subscribe((data: IUser) => {
      this.setFormData(data);
      this.clinicsAssigned = data.clinics;
    });
  }

  isClinicAssigned(clinicId: string) {
    if (this.clinicsAssigned && this.clinicsAssigned.length) {
      return this.clinicsAssigned.find(clinic => clinic.id === clinicId);
    }
  }

  isUpdateDisabled(): boolean {
    return this.editUserFormGroup.invalid;
  }

  update() {
    if (this.editUserFormGroup.valid) {
      const body = {
        status: 'active',
        clinics: this.clinicsAssigned.map(
          (el: { clinic: { id: string; name: string }; role: string }) => {
            return { clinic: el.clinic.id, role: el.role };
          }
        ),
        email: this.editUserFormGroup.get('email').value,
        firstname: this.editUserFormGroup.get('firstName').value,
        lastname: this.editUserFormGroup.get('lastName').value,
        phonenumber: `+${this.editUserFormGroup.get('phoneNumber').value}`,
        id: this.userId
      };
      this.usersService.updateUser(this.userId, body).subscribe(
        () => {
          this.showToast('User updated', 2000, NbToastStatus.SUCCESS);
        },
        () => {
          this.showToast('Error', 2000, NbToastStatus.DANGER);
        }
      );
    }
  }

  deleteUser() {
    this.dialogService
      .open(ConfirmationDialogComponent, {
        context: {
          itemName: 'user'
        }
      })
      .onClose.subscribe(async data => {
        if (data) {
          this.usersService.deleteUser(this.userId).subscribe(
            () => {
              this.showToast('User deleted', 2000, NbToastStatus.SUCCESS);
              this.back();
            },
            () => {
              this.showToast('Error', 2000, NbToastStatus.DANGER);
            }
          );
        } else {
          return;
        }
      });
  }

  deassignClinic(id: string) {
    this.clinicsAssigned.forEach((el, index) => {
      if (el.clinic.id === id) {
        this.clinicsAssigned.splice(index, 1);
      }
    });
  }

  assignClinic() {
    this.dialogService
      .open(AssignClinicModalComponent, {
        context: {
          clinicsAssigned: this.clinicsAssigned
        }
      })
      .onClose.subscribe(data => {
        if (data) {
          this.clinicsAssigned.push(data);
        }
      });
  }

  back() {
    this.routingState.back();
  }

  private setFormData(data: IUser) {
    this.editUserFormGroup.get('email').setValue(data.email);
    this.editUserFormGroup.get('firstName').setValue(data.firstname);
    this.editUserFormGroup.get('lastName').setValue(data.lastname);
    this.editUserFormGroup.get('phoneNumber').setValue(data.phonenumber);
    // this.editUserFormGroup.get('status').setValue(data.status);
  }

  private initForm() {
    this.editUserFormGroup = this.formBuilder.group({
      email: [
        '',
        [
          Validators.pattern(ValidationHelper.emailRegexPattern),
          Validators.required
        ]
      ],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', Validators.required]
      // status: ['', Validators.required]
    });
  }

  private showToast(message: string, time: number, status: NbToastStatus) {
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
}
