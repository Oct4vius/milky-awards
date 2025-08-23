import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { VoteCategoryService } from '../../services/vote-category.service';
import { GetAllOptionalCategoriesResponse } from '../../interfaces/vote-category.interfaces';
import { LoadingComponent } from '../../../../../shared/components/Loading/Loading.component';

@Component({
  templateUrl: './optional-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoadingComponent],
})
export class OptionalPageComponent implements OnInit {
  private voteCategoryService = inject(VoteCategoryService);

  public isLoading = signal<boolean>(true);

  public isButtonDisabled = signal<string[]>([]);

  public optionalCategories = signal<GetAllOptionalCategoriesResponse[]>([]);

  private getAllOptionalCategories = () => {
    this.isLoading.set(true);
    this.voteCategoryService.getAllOptionalCategories().subscribe({
      next: (categories) => {
        this.optionalCategories.set(categories);
      },
      error: (err) => {
        alert(err.message);
        console.error(err);

        this.optionalCategories.set([]);
      },
    });
    this.isLoading.set(false);
  };

  public increase = (uuid: string) => {
    this.isButtonDisabled.update((uuids) => [...uuids, uuid]);
    this.voteCategoryService.increaseVoteOptionalCatregory(uuid).subscribe({
      next: (category) => {
        const categories = this.optionalCategories();
        const index = categories.findIndex((cat) => cat.uuid === category.uuid);
        if (index !== -1) {
          categories[index] = category;
          this.optionalCategories.set([...categories]);
        }
        this.isButtonDisabled.update((uuids) =>
          uuids.filter((uuids) => uuids !== uuid)
        );
      },
      error: (err) => {
        alert(err.message);
        console.error(err);
        this.isButtonDisabled.update((uuids) =>
          uuids.filter((uuids) => uuids !== uuid)
        );
      },
    });
  };

  public decrease = (uuid: string) => {
    this.isButtonDisabled.update((uuids) => [...uuids, uuid]);
    this.voteCategoryService.DecreaseVoteOptionalCatregory(uuid).subscribe({
      next: (category) => {
        const categories = this.optionalCategories();
        const index = categories.findIndex((cat) => cat.uuid === category.uuid);
        if (index !== -1) {
          categories[index] = category;
          this.optionalCategories.set([...categories]);
        }
        this.isButtonDisabled.update((uuids) =>
          uuids.filter((uuids) => uuids !== uuid)
        );
      },
      error: (err) => {
        alert(err.message);
        console.error(err);
        this.isButtonDisabled.update((uuids) =>
          uuids.filter((uuids) => uuids !== uuid)
        );
      },
    });

  };

  ngOnInit(): void {
    this.getAllOptionalCategories();
  }
}
