import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorService {

  public errors: {[x: string]: string} = {
    required: 'Este campo ta vacio... Lo va a deja así? mmgvso',
    email: 'Yo no se muy bien pero creo que aquí va un email, no lo se eh',
    notEqual: 'La contraseña no tan iguale... Y entonce compai?',
    minlength: 'La contraseña debe tener al menos 6 caracteres',
  };

  public getErrorString(form: FormGroup, field: string): string | undefined {
    const error = Object.keys(form.controls[field as keyof typeof form.controls].errors || {});
    return this.errors[error[0] as keyof typeof this.errors];
  }

  public isValidField(form: FormGroup, field: string) {

    const errorString = this.getErrorString(form, field);


    return (errorString && form.controls[field].touched) ? errorString : false;
  }

  public isFieldOneEqualsFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value || "";
      const fieldValue2 = formGroup.get(field2)?.value || "";

      if(fieldValue1 !== fieldValue2){
        formGroup.get(field2)?.setErrors({notEqual: true})
        return {
          notEqual: true
        }
      }

      formGroup.get(field2)?.setErrors(null)
      return null;

    }
  }

}