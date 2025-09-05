import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { LoadingComponent } from '../../../../../shared/components/Loading/Loading.component';
import { ObligatoryService } from '../../services/obligatory.service';
import { ObligatoryCategories } from '../../interfaces/vote-category.interfaces';

@Component({
  selector: 'app-obligatory-page',
  imports: [LoadingComponent],
  templateUrl: './obligatory-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObligatoryPageComponent implements OnInit {
  public obligatoryService = inject(ObligatoryService);

  public isLoading = signal<boolean>(false);
  public obligatoryItems = signal<ObligatoryCategories[]>([]);

  private getAllObligatoryCategories() {
    this.isLoading.set(true);
    this.obligatoryService.getAll().subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.obligatoryItems.set([...response]);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  ngOnInit() {
    this.getAllObligatoryCategories();
  }
}
