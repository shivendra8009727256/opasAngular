import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @ViewChild('formContainer') formContainer!: ElementRef;

  name: string = '';
  email: string = '';
  message: string = '';
  isSent: boolean = false;

  isFormValid(): boolean {
    return this.name.trim() !== '' && this.email.trim() !== '' && this.email.includes('@');
  }

  sendLetter(): void {
    if (!this.isFormValid()) return;
    
    this.isSent = true;
    
    // Optional: You could send the data to a service here
    console.log('Form submitted:', {
      name: this.name,
      email: this.email,
      message: this.message
    });
    
    // Reset form after animation completes
    setTimeout(() => {
      this.resetForm();
    }, 6000);
  }

  private resetForm(): void {
    this.name = '';
    this.email = '';
    this.message = '';
    this.isSent = false;
  }
}
