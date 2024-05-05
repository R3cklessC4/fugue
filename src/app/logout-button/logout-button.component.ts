import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html'
})
export class LogoutButtonComponent implements OnInit {
  constructor(public auth: AuthService){
  }

  ngOnInit(): void {
  }

  logout(): void {
    console.log('Logging out...');
    this.auth.logout({} as any);
  }
}
