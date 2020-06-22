import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-ba-add-locale-modal',
  templateUrl: './add-locale-modal.component.html',
  styleUrls: ['./add-locale-modal.component.scss']
})
export class AddLocaleModalComponent implements OnInit {
  addLocaleFormGroup: FormGroup;

  constructor(
    protected ref: NbDialogRef<AddLocaleModalComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  dismiss() {
    if (this.addLocaleFormGroup.valid) {
      const locale = {
        locale: this.addLocaleFormGroup.get('locale').value,
        name: this.addLocaleFormGroup.get('language').value
      };
      this.ref.close(locale);
    } else {
      this.ref.close();
    }
  }

  private initForm() {
    this.addLocaleFormGroup = this.formBuilder.group({
      locale: ['', Validators.required],
      language: ['', Validators.required]
    });
  }
}
