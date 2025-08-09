import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validators.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  private router = inject(Router);

  public errorMessage = signal<string>("");
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

    this.authService.login({
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    }).subscribe({
      next: () => this.router.navigateByUrl(''),
      error: (message) => {
        this.errorMessage.set(message);
        this.loginForm.markAsUntouched();
        setTimeout(() => {
          this.errorMessage.set("");
        }, 5000);
      }
    })

  }
}
