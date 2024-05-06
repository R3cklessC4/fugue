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

  beginner = 'def main \n\t34 34 + puti \nend';
  intermediate = 'def main \n\t0 while dup 20 < do \n\t\t0 while dup over(2) < do \n\t\t\t"*" puts \n\t\t\t1 + end drop \n\t\t"<br>" puts \n\t\t1 + \n\tend drop \nend';

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

  setBeginner(){
    this.setEditorContent(this.beginner);
  }

  setIntermediate(){
    this.setEditorContent(this.intermediate);
  }
}
