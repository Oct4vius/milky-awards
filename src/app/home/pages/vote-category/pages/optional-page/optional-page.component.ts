import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { OptionalService } from '../../services/optional.service';
import { GetAllOptionalCategoriesResponse } from '../../interfaces/vote-category.interfaces';
import { LoadingComponent } from '../../../../../shared/components/Loading/Loading.component';
import { AuthService } from '../../../../../auth/services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './optional-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoadingComponent, FontAwesomeModule],
})
export class OptionalPageComponent implements OnInit {
  private voteCategoryService = inject(OptionalService);

  public faTrashCan = faTrashCan;

  public isLoading = signal<boolean>(false);

  public isButtonDisabled = signal<string[]>([]);

  public optionalCategories = signal<GetAllOptionalCategoriesResponse[]>([]);

  private authService = inject(AuthService);

  public get isUserAdmin() {
    return this.authService.isUserAdmin;
  }

  private getAllOptionalCategories = () => {
    this.isLoading.set(true);
    this.voteCategoryService.getAll().subscribe({
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

  public deleteVotation = (uuid: string) => {
    // Confirm before deleting
  }

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
