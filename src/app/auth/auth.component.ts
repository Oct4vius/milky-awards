import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  imports: [RouterOutlet],
  templateUrl: 'auth.component.html',
  styleUrl: 'auth.component.scss',
})
export class AuthLayoutComponent {

  private route: Router = inject(Router);

  currentRoute = signal<string>(this.route.url);

  public isActive(route: string): boolean {
    return this.currentRoute() === route;
  }

  public navigateTo(route: string) {
    this.route.navigate([route]);
    this.currentRoute.set(route);
  }

}
