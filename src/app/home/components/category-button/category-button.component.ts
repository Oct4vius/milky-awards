import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faVolumeMute, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'home-category-button',
  imports: [FontAwesomeModule],
  templateUrl: './category-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryButtonComponent {

  private router = inject(Router);

  public title = input.required<string>();
  public video = input<string>();
  public redirectTo = input<string>("");
  public disabled = input<boolean>(false);

  public isOpen = signal<boolean>(false);
  public isMuted = signal<boolean>(true);
  public faVolumeMute = faVolumeMute;
  public faVolumeHigh = faVolumeHigh;


  public onClick() {
    if (this.disabled()) return;
    this.router.navigate([this.redirectTo()]);
  }

  public onClickVolume(e: MouseEvent) {
    e.stopPropagation();
    this.isMuted.update((prev) => !prev);
  }

}
