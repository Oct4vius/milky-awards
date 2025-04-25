import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoryButtonComponent } from "../../components/category-button/category-button.component";

@Component({
  imports: [CategoryButtonComponent],
  templateUrl: './selection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionComponent { }
