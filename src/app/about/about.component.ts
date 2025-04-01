import { Component, AfterViewInit } from '@angular/core';
import {  OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule, ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {


  ngOnInit(): void {
    // You might want to preload the video here
  }

 
}
