import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  imports: [RouterOutlet],
  templateUrl: 'auth.component.html',
  styleUrl: 'auth.component.scss',
})
export class AuthLayoutComponent implements OnInit {

  private route: Router = inject(Router);

  currentRoute = signal<string>(this.route.url);

  public isActive(route: string): boolean {
    return this.currentRoute() === route;
  }

  public navigateTo(route: string) {
    this.route.navigate([route]);
    this.currentRoute.set(route);
  }

  ngOnInit(): void {
    console.log(this.currentRoute())
  }

}
