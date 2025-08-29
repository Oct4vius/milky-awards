import {
  ChangeDetectionStrategy,
  Component,
  inject,
  NgModule,
  OnInit,
  signal,
} from '@angular/core';
import { LoadingComponent } from '../../../../../shared/components/Loading/Loading.component';
import { CreateSuggestionResponse } from '../../interfaces/vote-category.interfaces';
import { SuggestionService } from '../../services/suggestion.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suggestion-page',
  imports: [LoadingComponent, FontAwesomeModule, FormsModule],
  templateUrl: './suggestion-page.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SuggestionPageComponent implements OnInit {
  
  private suggestionService = inject(SuggestionService);

  public selectedItem = signal<CreateSuggestionResponse>({} as CreateSuggestionResponse);
  public isLoading = signal<boolean>(false);
  public suggestionItems = signal<CreateSuggestionResponse[]>([]);

  
  public faTrashCan = faTrashCan;
  public faSquareCheck = faCheck;

  public whenOpeningModal = (item: CreateSuggestionResponse) => {
    this.selectedItem.set({...item});
  }

  public onApproveSuggestion = () => {
    this.suggestionService.approve({...this.selectedItem()}).subscribe({
      next: () => {
        this.getAllSuggestionItems();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  public onDeleteSuggestion = (uuid: string) => {
    this.suggestionService.delete(uuid).subscribe({
      next: () => {
        this.getAllSuggestionItems();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  public getAllSuggestionItems = () => {
    this.isLoading.set(true);

    this.suggestionService.getAll().subscribe({
      next: (items) => {
        this.suggestionItems.set(items);
        this.isLoading.set(false);
      },
      error: (err) => {
        
        console.error(err);
        this.suggestionItems.set([]);
        this.isLoading.set(false);
      },
    });
  };

  ngOnInit(): void {
    this.getAllSuggestionItems();
  }
}
