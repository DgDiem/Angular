import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  shouldDisplayHeaderFooter: boolean = true;

  private hiddenRoutes: string[] = [
    '/admin',
    '/listcate',
    '/addcate',
    '/editcate',
    '/editpro',
    '/listpro',
    '/addpro',
  ];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const url: string = event.url;
        this.shouldDisplayHeaderFooter = !this.hiddenRoutes.some((route) =>
          url.startsWith(route)
        );
      }
    });
  }
}
