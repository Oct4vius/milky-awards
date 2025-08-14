import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
})
export class HomeLayoutComponent implements OnInit {
  
  public authService = inject(AuthService);
  
  public userFirstName = computed(() => this.authService.currentUser()?.name || "Fulano")
  
  ngOnInit(): void {
    console.log(this.authService.currentUser());
  } 
}
