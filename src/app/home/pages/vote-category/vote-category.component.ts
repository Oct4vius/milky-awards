import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'home-vote-category',
  imports: [RouterOutlet],
  templateUrl: './vote-category.component.html',
  styleUrl: './vote-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoteCategoryComponent { 

  public router = inject(Router)
  public selectedMenu = signal<string>("");
  

  public onClickMenuItem = (menuItem: string) => {
    this.selectedMenu.set(menuItem);

    this.router.navigate([`/vote-category/${menuItem}`]);

  }

}
