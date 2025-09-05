import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'home-vote-category',
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './vote-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoteCategoryComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  public selectedMenu = signal<string>('');

  public faArrowLeft = faArrowLeft;
  public faBars = faBars;

  public MenuItems = [
    { name: 'Categorías obligatorias', route: 'cat-obligatory' },
    { name: 'Categorías opcionales', route: 'cat-optional' },
    { name: 'Sugiere una categoría', route: 'cat-make-suggestion' },
    {
      name: 'Categorías sugerenciadas',
      route: 'cat-suggestion',
    },
  ];
  ngOnInit(): void {
    const currentRoute = this.router.url.split('/').pop() || '';
    this.selectedMenu.set(currentRoute);
  }

  public isAdmin = () => this.authService.currentUser()?.admin || false;

  public onClickMenuItem = (menuItem: string) => {
    this.selectedMenu.set(menuItem);

    this.router.navigate([`/vote-category/${menuItem}`]);
  };

  public goBack = () => {
    this.router.navigate(['/']);
  };
}
