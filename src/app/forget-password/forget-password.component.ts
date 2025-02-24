import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  forgetPasswordForm: FormGroup;  // ✅ Renamed FormGroup

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.forgetPasswordForm = this.fb.group({  // ✅ Renamed here
      email: ["", [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  onForgetPassword() {  // ✅ Renamed method
    if (this.forgetPasswordForm.invalid) {
      this.forgetPasswordForm.markAllAsTouched();
      return;
    }

    const email = this.forgetPasswordForm.get('email')?.value;

    this.http.post(`http://localhost:8000/auth/resetPassword`, { email })
      .subscribe({
        next: (response) => {
          console.log('Password reset successful', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }
}
