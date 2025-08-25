import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../../../../../shared/services/validators.service';
import { SuggestionService } from '../../services/suggestion.service';

@Component({
  imports: [ReactiveFormsModule],
  templateUrl: './make-suggestion-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakeSuggestionPageComponent {
  private fb = inject(FormBuilder);
  private validatorService = inject(ValidatorService);
  private suggestionService = inject(SuggestionService);

  public isSuccess = signal<boolean | null>(null);
  public suggestForm = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
  });

  public isValidField(field: string) {
    return this.validatorService.isValidField(this.suggestForm, field);
  }

  public onSubmit() {
    if (!this.suggestForm.valid) return;

    this.suggestionService.createSuggestion({
      name: this.suggestForm.value.name!,
      description: this.suggestForm.value.description,
    }).subscribe({
      next: () => {
        this.isSuccess.set(true);
        setTimeout(() => this.isSuccess.set(null), 3000);
        this.suggestForm.reset();
      },
      error: (err) => {
        this.isSuccess.set(false);
        setTimeout(() => this.isSuccess.set(null), 3000);
        console.error(err);
      }
    })

  }
}
