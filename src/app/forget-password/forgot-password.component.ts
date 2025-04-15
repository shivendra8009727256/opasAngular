import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component'; // Adjust path as needed

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, NgIf,LoaderComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgetPasswordForm: FormGroup;  // ✅ Renamed FormGroup
  isLoading = false; // Add loading state

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
    this.isLoading = true; // Start loading
    const email = this.forgetPasswordForm.get('email')?.value;

    this.http.post(`https://opasbizz.in/api/auth/resetPassword`, { email })
      .subscribe({
        next: (response) => {
          console.log('Password reset successful', response);
          this.isLoading = false; // Stop loading on success
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
  }
}
