import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-optional-page',
  imports: [],
  templateUrl: './optional-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionalPageComponent { }
