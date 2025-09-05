import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../../../../../shared/services/validators.service';
import { SuggestionService } from '../../services/suggestion.service';
import { AlertService } from '../../../../../shared/components/Alert/services/alert.service';
import { AlertType } from '../../../../../shared/components/Alert/interfaces/alertType.interfaces';
import { LoadingComponent } from '../../../../../shared/components/Loading/Loading.component';

@Component({
  imports: [ReactiveFormsModule, LoadingComponent],
  templateUrl: './make-suggestion-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakeSuggestionPageComponent {
  private fb = inject(FormBuilder);
  private validatorService = inject(ValidatorService);
  private suggestionService = inject(SuggestionService);
  private alert = inject(AlertService);

  public isLoading = signal<boolean>(false);
  public suggestForm = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
  });

  public isValidField(field: string) {
    return this.validatorService.isValidField(this.suggestForm, field);
  }

  public onSubmit() {
    if (!this.suggestForm.valid) return;

    this.isLoading.set(true);
    this.suggestionService
      .create({
        title: this.suggestForm.value.name!,
        description: this.suggestForm.value.description,
      })
      .subscribe({
        next: () => {
          this.alert.useAlert({
            type: AlertType.SUCCESS,
            message: 'Sugerencia enviada!',
            timeout: 3000,
          });
          this.suggestForm.reset();
          this.isLoading.set(false);
        },
        error: (err) => {
          this.alert.useAlert({
            type: AlertType.ERROR,
            message:
              'Ocurrio algo mal. Habla con una de la gente que hace el diparate ete.',
            timeout: 3000,
          });
          console.error(err);
          this.isLoading.set(false);
        },
      });
  }
}
