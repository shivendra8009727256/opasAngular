import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

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
