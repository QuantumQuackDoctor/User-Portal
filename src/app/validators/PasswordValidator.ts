import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string | null = control.value;

    const passwordLength = value?.length >= 8;

    const whiteSpace = !/[\s]/.test(value);

    const specialChar = /[^a-zA-Z0-9]/.test(value);

    const uppercase = /[A-Z]/.test(value);

    const number = /[0-9]/.test(value);

    const valid =
      passwordLength && whiteSpace && specialChar && uppercase && number;

    return valid
      ? null
      : {
          validPassword: {
            passwordLength,
            whiteSpace,
            specialChar,
            uppercase,
            number,
          },
        };
  };
}
