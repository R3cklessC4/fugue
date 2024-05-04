import { Component } from '@angular/core';
import { NavigationEnd, Event, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fugue';
  imagePath: any;
  isLogin: boolean = false;

  constructor(private router: Router){
    router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd) {
        this.isLogin = event.url === '/login';
      }
    });
  }

  loginWithRedirect() {
    // this.auth.loginWithRedirect;
  }
}
