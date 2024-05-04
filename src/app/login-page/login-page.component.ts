import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  isLogin: boolean = false;
  isLoginFormVisible: boolean = true;
  formTitle: string = 'Welcome Back';
  toggleButtonText: string = 'Need an account? Click the switch to Sign up';
  backgroundClass: string = 'background-left';

  constructor(private router:Router) {}
  ngOnInit(){}

  onSubmit(form: NgForm, formType: string) {
    if(formType === "login") {
      this.isLogin = true;
      this.router.navigate(['/editor-page']);
    } else {
      this.toggleForm();
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
}
