import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, FontAwesomeModule],
})
export class HomeLayoutComponent {
  
  private authService = inject(AuthService);

  
  public userFirstName = computed(() => this.authService.currentUser()?.name || "Fulano")
  
  public faArrowRightFromBracket = faArrowRightFromBracket;
  
  public logout = () => this.authService.logout();
  
}
