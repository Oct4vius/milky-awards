import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validators.service';

@Component({
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private validatorService = inject(ValidatorService);

  public registerForm = this.fb.group(
    {
      'first name': ['', Validators.required],
      'last name': ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      'confirm password': ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [
        this.validatorService.isFieldOneEqualsFieldTwo(
          'password',
          'confirm password'
        ),
      ],
    }
  );

  public registerElements = computed(() =>
    Object.keys(this.registerForm.controls)
  );

  public isValidField(field: string) {
    return this.validatorService.isValidField(this.registerForm, field);
  }

  public onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log(this.registerForm.value);
  }
}
