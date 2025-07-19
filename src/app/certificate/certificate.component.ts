import { inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [MatButtonModule, FormsModule],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css'
})
export class CertificateComponent implements OnInit {
  @ViewChild('formContainer') formContainer!: ElementRef;

  private http = inject(HttpClient);

  // Contact form fields
  name: string = '';
  mobile: string = '';
  product: string = '';
  email: string = '';
  message: string = '';
  countryCode = '+91'; // Default country code

  isSent: boolean = false;
  userId: string;

  // Company details for SEO + UI
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

  // Certifications to show on UI
  certificates = [
    { title: 'FSSAI Certificate', image: '/certificate/fssaci_img.avif' },
    { title: 'GST Certificate', image: '/certificate/gst_img.avif' },
    { title: 'Certificate of registration', image: '/certificate/certificate_of_registration.avif' },
    { title: 'Incorporation Certificate', image: '/certificate/incorpor_img.avif' }
  ];

  constructor(private fb: FormBuilder,
  private router: Router,
  private meta: Meta,
  private titleService: Title) {
    this.userId = localStorage.getItem("userId")?.replace(/"/g, '') || '';
  }

  ngOnInit(): void {
  this.titleService.setTitle('Opas Bizz – Global Grain Certifications & Contact');
  this.meta.addTags([
    { name: 'description', content: 'See Opas Bizz certifications (FSSAI, GST, Incorporation) and contact us for international grain trading partnerships.' },
    { name: 'keywords', content: 'FSSAI, GST, Incorporation, Opas Bizz, global grains, certificate, import export, grain trading, India exports' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'Opas Bizz Certifications & Contact' },
    { property: 'og:description', content: 'We are a certified global grain export company. Get in touch to collaborate.' },
   
    { property: 'og:url', content: 'https://opasbizz.in/certificates' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Opas Bizz – Grain Export Certification' },
    { name: 'twitter:description', content: 'Explore our verified certifications and partner with us globally.' }
  ]);
}


  handleVideoError(): void {
    console.error('Video failed to load');
  }

  isFormValid(): boolean {
    return (
      this.name.trim() !== '' &&
      this.email.trim() !== '' &&
      this.email.includes('@') &&
      this.mobile.trim().length >= 8
    );
  }

  submitForm(): void {
    if (!this.isFormValid()) {
      alert('❌ Please fill out all required fields correctly.');
      console.log("value>>>>>>>>>", this.name,this.email,this.product,this.countryCode,this.mobile,
      this.message,)
      return;
    }

    const fullMobile = `${this.countryCode} ${this.mobile}`;

    const inquiryPayload = {
      fullName: this.name,
      email: this.email,
      productName: this.product,
      phoneCode: this.countryCode,
      phoneNumber: this.mobile,
      message: this.message,
      status: "Pending",
      userId: this.userId || null
    };

    console.log("🔁 Submitting inquiry >>>>>", inquiryPayload);

    this.http.post("https://opasbizz.in/api/userInquiry/inquirySave", inquiryPayload).subscribe({
      next: (res: any) => {
        this.isSent = true;
        alert('✅ Thank you for contacting us! We’ll get back to you shortly.');
        this.resetForm();
      },
      error: (err) => {
        console.error("❌ Submission error:", err);
        alert("⚠️ Something went wrong. Please try again later.");
      }
    });
  }

  private resetForm(): void {
    this.name = '';
    this.mobile = '';
    this.product = '';
    this.email = '';
    this.message = '';
    this.isSent = false;
  }
}
