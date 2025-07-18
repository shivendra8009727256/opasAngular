import {  inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-certificate',
  imports: [MatButtonModule, FormsModule],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css'
})
export class CertificateComponent {
   @ViewChild('formContainer') formContainer!: ElementRef;
  
  private http = inject(HttpClient);
  
    name: string = '';
    mobile: string = '';
    product: string = '';
    email: string = '';
    message: string = '';
    isSent: boolean = false;
  
  certificates = [
    { 
      title: 'FSSAI Certificate', 
      image: '/certificate/fssaci_img.avif' 
    },
    { 
      title: 'GST Certificate', 
      image: '/certificate/gst_img.avif' 
    },
     { 
      title: 'Certificate of registration', 
      image: '/certificate/certificate_of_registration.avif' 
    },
    { 
      title: 'Incorporation Certificate', 
      image: '/certificate/incorpor_img.avif' 
    },

    
  ];

  companyDetails = {
    name: 'Opas Bizz Pvt. Ltd.',
    founded: '2020',
    employees: '250+',
    mission: "At Opas Bizz Pvt Ltd, we are committed to being the trusted global bridge for grain commerce, facilitating the seamless import and export of high-quality grains across international markets. We specialize in bulk procurement and distribution, ensuring food security while creating value for farmers, processors, and consumers worldwide.",
    values: [
      'Global Integrity',
      'Reliability at Scale',
      'Uncompromising Quality',
      'Sustainable Partnerships',
      'Market Adaptability'
    ]
  };
  userId: string;

  ngOnInit(): void {
    // You might want to preload the video here
  }

  handleVideoError() {
    console.error('Video failed to load');
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
    }
    //////////////////////////email card end //////////////////////////

}
