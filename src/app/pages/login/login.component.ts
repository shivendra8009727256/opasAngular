import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginModel = {
    username: '',
    password: ''
  };

  togglePassword(field: string) {
    const passwordField = document.getElementById(`${field}-password`) as HTMLInputElement;
    const eyeIcon = document.getElementById(`${field}-eye`) as HTMLElement;
    
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
      passwordField.type = 'password';
      eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
  }
}
