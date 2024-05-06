/* app.component.ts */
import { Component, ViewChild } from '@angular/core';
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

  intermediate = 'def main 0 while dup 20 < do 0 while dup over(2) < do "*" puts 1 + end drop "<br>" puts 1 + end drop end';

  constructor(private router: Router){
    this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.isLogin = event.url === '/login-page';
    });
  }

  setEditorContent(content: string) {
    console.log(content);
    this.router.navigate(['/editor-page'], { queryParams: { content: content } });
  }
}
