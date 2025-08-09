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
  private authService = inject(AuthService);

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

  public checkingIfWhitelisted = signal<boolean>(false);
  public registerElements = computed(() =>
    Object.keys(this.registerForm.controls)
  );

  public checkIfWhitelisted() {


    console.log('Checking if whitelisted...');

    this.checkingIfWhitelisted.set(true);

    const email = this.registerForm.get('email')?.value;

    if( !email || this.registerForm.get('email')?.invalid) {
      this.checkingIfWhitelisted.set(false);
      return;
    }

    this.authService.checkIfWhitelisted(email).subscribe({
      next: () => {
        this.checkingIfWhitelisted.set(false);
        this.registerForm.get('email')?.setErrors(null);
      },
      error: (err) => {
        this.checkingIfWhitelisted.set(false);
        this.registerForm.get('email')?.setErrors({
          notWhitelisted: true,
          message: err,
        });
        
      },
    })


  }

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
