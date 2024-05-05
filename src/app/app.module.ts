import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EditorPageComponent } from './editor-page/editor-page.component';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AuthModule } from '@auth0/auth0-angular';
import { environment as env} from '../environments/environment';
import { LoginButtonComponent } from './login-button/login-button.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    EditorPageComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, 
    HttpClientModule, 
    FormsModule,
    AuthModule.forRoot(env.auth)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
