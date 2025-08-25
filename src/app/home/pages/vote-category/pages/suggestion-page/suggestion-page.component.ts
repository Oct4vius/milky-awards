import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { LoadingComponent } from '../../../../../shared/components/Loading/Loading.component';
import { CreateSuggestionResponse } from '../../interfaces/vote-category.interfaces';
import { SuggestionService } from '../../services/suggestion.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from "../../../../../shared/components/Modal/Modal.component";

@Component({
  selector: 'app-suggestion-page',
  imports: [LoadingComponent, FontAwesomeModule, ModalComponent],
  templateUrl: './suggestion-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionPageComponent implements OnInit {
  
  private suggestionService = inject(SuggestionService);
  
  
  public faTrashCan = faTrashCan;
  public faSquareCheck = faCheck;
  public isLoading = signal<boolean>(false);
  public suggestionItems = signal<CreateSuggestionResponse[]>([]);


  public getAllSuggestionItems = () => {
    this.isLoading.set(true);

    this.suggestionService.getAllSuggestions().subscribe({
      next: (items) => {
        this.suggestionItems.set(items);
        this.isLoading.set(false);
      },
      error: (err) => {
        // alert(err.message);
        console.error(err);

        this.suggestionItems.set([]);
      },
    });
  };

  ngOnInit(): void {
    this.getAllSuggestionItems();
  }
}
