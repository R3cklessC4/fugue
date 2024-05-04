import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fugue';
  imagePath: any;
  isLogin: boolean = false;

  constructor(public auth: AuthService, private router: Router){
    this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.isLogin = event.url === '/login-page';
    });
  }
}
