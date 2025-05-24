
import {  inject, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoaderComponent } from '../loader/loader.component'; // Adjust path as needed
declare var bootstrap: any; // Import Bootstrap for TypeScript

@Component({
  selector: 'app-about',
  imports: [MatButtonModule,  NgFor, FormsModule,LoaderComponent,NgIf],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  @ViewChild('carouselElement', { static: true }) carousel!: ElementRef;
  @ViewChild('formContainer') formContainer!: ElementRef;
  isLoading = false; // Add loading state

private http = inject(HttpClient);

  name: string = '';
  mobile: string = '';
  product: string = '';
  email: string = '';
  message: string = '';
  isSent: boolean = false;

  teamMembers = [
    {
      name: 'Grish Sharma',
      position: 'Managing Director',
      image: '/images/client_img.png',
      description: "At the heart of our organization lies a dedicated and dynamic team committed to driving innovation, growth, and success. Leading this team is our visionary Managing Director, Grish Sharma, whose strategic leadership and industry expertise have been instrumental in shaping our company’s direction. Alongside him, a talented group of professionals collaborates to deliver excellence in every endeavor."
    },
    {
      name: 'Sourabh Priyadarshi',
      position: 'General Manager',
      image: '/images/client_img.png',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,'
    },
    {
      name: 'Sourabh Priyadarshi',
      position: 'General Manager',
      image: '/images/client_img.png',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,'
    },
    // {
    //   name: 'Anand Kumar',
    //   position: 'C A',
    //   image: '/images/client_img.png',
    //   description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,'
    // },
    // {
    //   name: 'Avinash Kumar',
    //   position: 'Market Head',
    //   image: '/images/client_img.png',
    //   description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,'
    // },
    // {
    //   name: 'Aman Kumar',
    //   position: 'Market Head',
    //   image: '/images/client_img.png',
    //   description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,'
    // }
  ];
  userId: string;

  ngAfterViewInit() {
    const carouselInstance = new bootstrap.Carousel(this.carousel.nativeElement, {
      interval: 3000, // Auto-slide every 3 seconds
      ride: 'carousel'
    });
  }

  constructor(private fb: FormBuilder, private router: Router){
    this.userId = localStorage.getItem("userId")?.replace(/"/g, '') || '';
  }


  // ?/////////////////////email card ////////////////
  isFormValid(): boolean {
    return this.name.trim() !== '' && this.email.trim() !== '' && this.email.includes('@');
  }

  sendLetter(): void {
    if (!this.isFormValid()) return;
    this.isLoading = true; // Start loading
    const obj = {
      fullName: this.name,
      email: this.email,
      productName: this.product,
      phoneCode: "formValue.phoneCode",
      phoneNumber: this.mobile,
      message: this.message,
      status: "pending",
      userId: this.userId ||null
    };
    console.log(" send DATA OF ENQUIRY API>>>>>>>>>", obj);
    this.http.post("https://opasbizz.in/api/userInquiry/inquirySave", obj).subscribe({
      next: async (res: any) => {
        if (res) {
          this.isSent = true;
          console.log("IF USER IS LOG IN >>>>>>>>", res)
          // Reset form after animation completes
          setTimeout(() => {
            this.resetForm();
          }, 6000);
        }
      },
      error: (err) => {
        // this.openSnackBar("Error submitting form. Please try again.", "close");
        console.error("Submission error:", err);
        this.isLoading = false; // end loading
      }
    });
    // this.isSent = true;

    // // Optional: You could send the data to a service here
    // console.log('Form submitted:', {
    //   name: this.name,
    //   mobile: this.mobile,
    //   email: this.email,
    //   message: this.message
    // });

    // Reset form after animation completes
    // setTimeout(() => {
    //   this.resetForm();
    // }, 6000);
  }

  private resetForm(): void {
    this.name = '';
    this.mobile = '';
    this.product = '';
    this.email = '';
    this.message = '';
    this.isSent = false;
    this.isLoading = false; // end loading
  }
  //////////////////////////email card end //////////////////////////
}
 

