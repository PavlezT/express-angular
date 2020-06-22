import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbToastrService
} from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

import { RoutingState } from '../../../@core/services/routing-state.service';
import { ValidationHelper } from '../../../@core/utils/validators';
import { IListItemClinic } from '../../../shared/models/clinic.models';
import { IUser } from '../../../shared/models/user.models';
import { UsersService } from '../../../shared/services/users.service';
import { AssignClinicModalComponent } from '../assign-clinic-modal/assign-clinic-modal.component';

@Component({
  selector: 'ngx-ba-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserFormGroup: FormGroup;

  clinics: Array<IListItemClinic>;

  clinicsAssigned: any = [];

  statuses = [
    { key: 'pending', value: 'Pending' },
    { key: 'validated', value: 'Validated' },
    { key: 'active', value: 'Active' }
  ];

  constructor(
    private routingState: RoutingState,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  isCreateDisabled(): boolean {
    return this.addUserFormGroup.invalid;
  }

  create() {
    if (this.addUserFormGroup.valid) {
      const body = {
        status: 'active',
        clinics: this.clinicsAssigned.map(
          (el: { clinic: { id: string; name: string }; role: string }) => {
            return { clinic: el.clinic.id, role: el.role };
          }
        ),
        email: this.addUserFormGroup.get('email').value,
        firstname: this.addUserFormGroup.get('firstName').value,
        lastname: this.addUserFormGroup.get('lastName').value,
        phonenumber: `+${this.addUserFormGroup.get('phoneNumber').value}`
      };
      this.usersService.createUser(body).subscribe(
        (data: IUser) => {
          this.showToast('User created', 2000, NbToastStatus.SUCCESS);
          this.navigate(`/pages/users/edit-user/${data.id}`);
        },
        () => {
          this.showToast('Error', 2000, NbToastStatus.DANGER);
        }
      );
    }
  }

  navigate(url: string) {
    this.routingState.navigate(url);
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

  private initForm() {
    this.addUserFormGroup = this.formBuilder.group({
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
    });
  }

  // "node_modules/bootstrap/dist/css/bootstrap.css",

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
