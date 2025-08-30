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
  private optionalService = inject(OptionalService);

  public faTrashCan = faTrashCan;

  public isLoading = signal<boolean>(false);

  public isButtonDisabled = signal<string[]>([]);

  public optionalItems = signal<GetAllOptionalCategoriesResponse[]>([]);

  private authService = inject(AuthService);

  public get isUserAdmin() {
    return this.authService.isUserAdmin;
  }

  private getAllOptionalCategories = () => {
    this.isLoading.set(true);
    this.optionalService.getAll().subscribe({
      next: (categories) => {
        this.optionalItems.set(categories);
      },
      error: (err) => {
        alert(err.message);
        console.error(err);

        this.optionalItems.set([]);
      },
    });
    this.isLoading.set(false);
  };

  public deleteVotation = (uuid: string) => {
    this.optionalService.delete(uuid).subscribe({
      next: () => {
        this.getAllOptionalCategories()
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  public increase = (uuid: string) => {
    this.isButtonDisabled.update((uuids) => [...uuids, uuid]);
    this.optionalService.increaseVoteOptionalCatregory(uuid).subscribe({
      next: (category) => {
        const categories = this.optionalItems();
        const index = categories.findIndex((cat) => cat.uuid === category.uuid);
        if (index !== -1) {
          categories[index] = category;
          this.optionalItems.set([...categories]);
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
    this.optionalService.DecreaseVoteOptionalCatregory(uuid).subscribe({
      next: (category) => {
        const categories = this.optionalItems();
        const index = categories.findIndex((cat) => cat.uuid === category.uuid);
        if (index !== -1) {
          categories[index] = category;
          this.optionalItems.set([...categories]);
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
