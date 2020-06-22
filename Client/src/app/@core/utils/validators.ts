import { AbstractControl, ValidatorFn } from '@angular/forms';

// @dynamic
export class ValidationHelper {
  public static get passwordRegexPattern(): RegExp {
    return <RegExp>/^((?=.*[a-z])(?=.*[A-Z])|(?=.*[0-9])).{6,255}$/;
  }

  public static get emailRegexPattern(): RegExp {
    return <
      RegExp // tslint:disable-next-line:max-line-length
    >/^\s*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
  }

  public static get reqiredFieldRegexPattern(): RegExp {
    return <RegExp>/^(?=.*\S).+$/;
  }

  public static get noDigitsRegexPattern(): RegExp {
    return <RegExp>/^([^0-9]*)$/;
  }

  public static get birthDateRegexPattern(): RegExp {
    return <RegExp>(
      /^\s*(1[012]|0?[1-9])\.(3[01]|[12][0-9]|0?[1-9])\.((?:19|20)\d{2})\s*$/
    );
  }
}

export const equalTo = (equalControl: AbstractControl): ValidatorFn => {
  let subscribe = false;

  return (control: AbstractControl): { [key: string]: boolean } => {
    if (!subscribe) {
      subscribe = true;
      equalControl.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
      });
    }

    const value: string = control.value;

    return equalControl.value === value ? null : { equalTo: true };
  };
};
