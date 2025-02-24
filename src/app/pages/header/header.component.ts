import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  lastScrollY = window.scrollY;
  isHidden = false;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > this.lastScrollY && currentScrollY > 50) {
      this.isHidden = true; // Hide header when scrolling down
    } else {
      this.isHidden = false; // Show header when scrolling up
    }

    this.lastScrollY = currentScrollY;
  }
  
  isMenuOpen = false; // Manage the visibility of the mobile menu

  // Method to toggle the mobile menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Close menu when the user clicks outside of it
  @HostListener('document:click', ['$event'])
  closeMenuOnClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('nav')) {
      this.isMenuOpen = false;
    }
  }

  // Close menu when the user moves the cursor out of the menu bar
  closeMenuOnMouseLeave() {
    this.isMenuOpen = false;
  }
}
