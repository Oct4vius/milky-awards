import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoryButtonComponent } from "./components/category-button/category-button.component";

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CategoryButtonComponent],
})
export class HomeLayoutComponent { }
