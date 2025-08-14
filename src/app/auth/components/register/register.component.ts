import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  faCircleCheck,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ValidatorService } from '../../../shared/services/validators.service';
import { AuthService } from '../../services/auth.service';
import { TooltipDataType } from '../../interfaces/tooltip-data.interfaces';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, FontAwesomeModule],
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
  private authService = inject(AuthService);
  private router = inject(Router);

  public registerForm = this.fb.group(
    {
      username: ['', Validators.required],
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

  public faCircleCheck = faCircleCheck;
  public faXmarkCircle = faXmarkCircle;

  public errorMessage = signal<string>('');
  public messageTooltipData = signal<TooltipDataType | null>(null);
  public checkingIfWhitelisted = signal<boolean>(false);
  public registerElements = computed(() =>
    Object.keys(this.registerForm.controls)
  );

  public checkIfWhitelisted() {
    this.messageTooltipData.set(null);

    this.checkingIfWhitelisted.set(true);

    const email = this.registerForm.get('email')?.value;

    if (!email || this.registerForm.get('email')?.invalid) {
      this.checkingIfWhitelisted.set(false);
      return;
    }

    this.authService.checkIfWhitelisted(email).subscribe({
      next: (something) => {
        this.checkingIfWhitelisted.set(false);
        this.registerForm.get('email')?.setErrors(null);
        this.messageTooltipData.set({
          message: 'Your E-mail is whitelisted',
          status: 'success',
        });
      },
      error: (err) => {
        this.checkingIfWhitelisted.set(false);
        this.registerForm.get('email')?.setErrors({
          notWhitelisted: true,
          message: err,
        });
        this.messageTooltipData.set({
          message: err || 'Your E-mail is not whitelisted',
          status: 'error',
        });
      },
    });
  }

  public isValidField(field: string) {
    return this.validatorService.isValidField(this.registerForm, field);
  }

  public onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.authService
      .register({
        username: this.registerForm.value.username!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
      })
      .subscribe({
        next: () => this.router.navigateByUrl(''),
        error: (message) => {
          this.errorMessage.set(message);

          setTimeout(() => {
            this.errorMessage.set('');
          }, 5000);

          this.registerForm.reset();
          
        },
      });
  }
}
