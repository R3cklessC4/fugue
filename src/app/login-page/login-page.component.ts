import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  email: string = '';
  password: string = '';
  otp: string = '';

  isLogin: boolean = false;
  isLoginFormVisible: boolean = true;
  formTitle: string = 'Welcome Back';
  toggleButtonText: string = 'Need an account? Click the switch to Sign up';
  backgroundClass: string = 'background-left';

  isConfirm: boolean = false;

  constructor(private router:Router, private authService: AuthService) {}
  ngOnInit(){}

  onSubmit(form: NgForm, formType: string) {
    if(formType === "login") {
      this.authService.signIn(this.email, this.password)
      .then(result => console.log('User signed in:', result))
      .catch(err => console.error('An error occurred during sign in:', err));
      this.isLogin = true;
      if(this.authService.isAuthenticated()){
        this.router.navigate(['/editor-page']);
      }
    } else {
      console.log("EMAIL:"+this.email+"\nPASSWORD:"+this.password);
      this.authService.signUp(this.email, this.password)
      .then(user => console.log('User signed up:', user))
      .catch(err => console.error('An error occurred during sign up:', err));
      this.isConfirm = true;
      this.isAuthenticated();
    }
  }

  toggleForm(): void {
    this.isLoginFormVisible = !this.isLoginFormVisible;
    this.backgroundClass = this.isLoginFormVisible ? 'background-left' : 'background-right';
    if(this.isLoginFormVisible) {
      this.formTitle = 'Welcome Back'
      this.toggleButtonText = 'Need an account? Click the switch to Sign up';
    } else {
      this.formTitle = 'Create an Account';
      this.toggleButtonText = 'Already have an account? Click the switch to Sign in';    }
  }

  isAuthenticated() {
    const authenticated = this.authService.isAuthenticated();
    console.log('Is authenticated:', authenticated);
  }
}
