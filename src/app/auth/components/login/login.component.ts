import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validators.service';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'login.component.html',
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class LoginComponent {
  private validatorService = inject(ValidatorService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  public loginElements = computed(() => Object.keys(this.loginForm.controls));

  public isValidField(field: string) {
    return this.validatorService.isValidField(this.loginForm, field);
  }

  public onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const response = this.authService.login({
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    })

    console.log(this.loginForm.value, response);
  }
}
