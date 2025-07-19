import { RouterLink } from '@angular/router';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const grainColors = ['#080808ff', '#080808ff', 'rgb(9 39 76 / 69%);', '#020258ff'];
      const index = new Date().getDay() % grainColors.length;
      document.querySelector('.footer')?.setAttribute('style', `background-color: ${grainColors[index]}`);
    }
  }
}
