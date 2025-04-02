
import {  OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
declare var bootstrap: any; // Import Bootstrap for TypeScript

@Component({
  selector: 'app-about',
  imports: [CommonModule, ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  @ViewChild('carouselElement', { static: true }) carousel!: ElementRef;

  teamMembers = [
    {
      name: 'Sourabh Priyadarshi',
      position: 'General Manager',
      image: '/sourabh.png',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,'
    },
    {
      name: 'Anand Kumar',
      position: 'C A',
      image: '/anand.png',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,'
    },
    {
      name: 'Avinash Kumar',
      position: 'Market Head',
      image: '/avinash.png',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,'
    },
    {
      name: 'Aman Kumar',
      position: 'Market Head',
      image: '/aman.png',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,'
    }
  ];

  ngAfterViewInit() {
    const carouselInstance = new bootstrap.Carousel(this.carousel.nativeElement, {
      interval: 3000, // Auto-slide every 3 seconds
      ride: 'carousel'
    });
  }
}
 

