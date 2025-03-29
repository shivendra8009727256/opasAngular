import { Component } from '@angular/core';

@Component({
  selector: 'app-certificate',
  imports: [],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css'
})
export class CertificateComponent {
  
  certificates = [
    { 
      title: 'Quality Excellence 2023', 
      image: 'https://picsum.photos/id/10/150/200' 
    },
    { 
      title: 'Innovation Award 2022', 
      image: 'https://picsum.photos/id/11/150/200' 
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

  ngOnInit(): void {
    // You might want to preload the video here
  }

  handleVideoError() {
    console.error('Video failed to load');
  }

}
