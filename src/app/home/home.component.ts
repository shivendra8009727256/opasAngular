import { Component, AfterViewInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
@Component({
  selector: 'app-home',
  imports: [MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ngAfterViewInit(): void {
  const slideshowImages = document.querySelectorAll<HTMLImageElement>(".intro-slideshow img");

    const nextImageDelay = 5000;
    let currentImageCounter = 0;

    // Ensure at least one image exists
    if (slideshowImages.length > 0) {
      slideshowImages[currentImageCounter].style.opacity = "1";

      setInterval(() => {
        slideshowImages[currentImageCounter].style.opacity = "0";
        currentImageCounter = (currentImageCounter + 1) % slideshowImages.length;
        slideshowImages[currentImageCounter].style.opacity = "1";
      }, nextImageDelay);
    }
  }

   img1="/logo3.png"
   img2="/best_logo1.png"
   img3="/logo3.png"
   img4="/opasLogo.png"
   img5="/logo3.png"

}
