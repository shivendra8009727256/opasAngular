
import { RouterLink } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
   ngOnInit(): void {
    const grainColors = ['#f5deb3', '#deb887', '#e0cda9', '#f0e68c', '#ffe4b5', '#d2b48c', '#fdf5e6'];
    const index = new Date().getDay() % grainColors.length;
    document.querySelector('.footer')?.setAttribute('style', `background-color: ${grainColors[index]}`);
  }

}
