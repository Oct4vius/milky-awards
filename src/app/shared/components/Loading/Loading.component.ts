import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-loading',
  imports: [],
  templateUrl: './Loading.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent { }
