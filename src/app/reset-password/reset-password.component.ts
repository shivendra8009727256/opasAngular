import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';  // ✅ Import this

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [NgClass, NgIf, ReactiveFormsModule],  // ✅ Ensure this is added
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  
  token: string = '';
  passwordForm: FormGroup;
  show1: string = "password";
  show2: string = "password";

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.passwordForm = this.fb.group({
      newPassword: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  showPassword1() {
    this.show1 = this.show1 === "password" ? "text" : "password";
  }

  showPassword2() {
    this.show2 = this.show2 === "password" ? "text" : "password";
  }

  resetPassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const newPassword = this.passwordForm.get('newPassword')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    this.http.post(`https://opasbizz.in/api/auth/changePassword/${this.token}`, { newPassword })
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
