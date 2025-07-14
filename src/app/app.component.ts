import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./pages/header/header.component";
import { FooterComponent } from "./pages/footer/footer.component";
import { SocialShareComponent } from "./social-share/social-share.component";
import { ScrollButtonComponent } from './scroll-button/scroll-button.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SocialShareComponent,ScrollButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'opasbizz';
  private router = inject(Router);

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' }); // Smoothly scrolls to top
        }, 100); // Delay ensures scrolling happens after page load
      }
    });
  }
}
