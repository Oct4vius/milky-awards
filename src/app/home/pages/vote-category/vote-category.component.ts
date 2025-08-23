import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'home-vote-category',
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './vote-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoteCategoryComponent {
  public router = inject(Router);

  public selectedMenu = signal<string>('');

  public faArrowLeft = faArrowLeft;

  public MenuItems = [
    { name: 'Categorías obligatorias', route: 'cat-obligatory' },
    { name: 'Categorías opcionales', route: 'cat-optional' },
    { name: 'Sugiere una categoría', route: 'cat-make-suggestion' },
    { name: 'Categorías sugerenciadas', route: 'cat-suggestion' },
  ];

  public onClickMenuItem = (menuItem: string) => {
    this.selectedMenu.set(menuItem);

    this.router.navigate([`/vote-category/${menuItem}`]);
  };

  public goBack = () => {
    this.router.navigate(['/']);
  }
}
