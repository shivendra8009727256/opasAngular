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
    { 
      title: 'Customer Satisfaction 2021', 
      image: 'https://picsum.photos/id/12/150/200' 
    }
  ];

  companyDetails = {
    name: 'TechVision Inc.',
    founded: '2015',
    employees: '150+',
    mission: 'To innovate and deliver exceptional technology solutions that empower businesses and improve lives.',
    values: [
      'Innovation',
      'Integrity',
      'Customer Focus',
      'Excellence',
      'Sustainability'
    ]
  };

  ngOnInit(): void {
    // You might want to preload the video here
  }

 

}
