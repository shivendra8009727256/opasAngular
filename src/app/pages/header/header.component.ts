import { NgIf } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import{ShareDataService} from '../../share-data.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-header',
  imports: [RouterLink,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  http = inject(HttpClient);
  router = inject(Router);
  userData: any = null; // Store the received user data
  private subscription: Subscription = new Subscription(); // Initialize here
  lastScrollY = window.scrollY;
  isHidden = false;
   isMenuOpen = false;   
   isLoggedIn = true; // Set this based on your authentication logic
   isDropdownOpen = false;
   userName:string | null=null
   gstNo:string | null
   userId:any

 

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
  
  // isMenuOpen = false; 

  // Toggle mobile menu
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


   constructor(private ShareDataService:ShareDataService){
   // Retrieve values from localStorage and remove double quotes
const rawUserName = localStorage.getItem("fullName")?.replace(/"/g, '') || '';
this.userId = localStorage.getItem("userId")?.replace(/"/g, '') || '';

// Capitalize the first letter of each word in the name
this.userName = rawUserName
  .split(' ') // Split the name into an array of words
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
  .join(' '); // Join the words back into a single string

this.gstNo = localStorage.getItem("gstNo")?.replace(/"/g, '') || '';
   }
   ngOnInit() {
    this.getUser()
    
    // Subscribe to the userData$ Observable
    this.subscription = this.ShareDataService.userData$.subscribe(async (data) => {
      this.userData = data.user; // Update the user data
     await this.login()
     this.userName=this.userData.fullName.split(' ') // Split the name into an array of words
     .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
     .join(' '); // Join the words back into a single string
   this.gstNo=this.userData.gstNo?.replace(/"/g, '') || ''
      console.log('User data received in HeaderComponent:', this.userData);
    });
  }
  getUser() {
      try{
        let params = new HttpParams().set('userId', this.userId);
      this.http.get('http://localhost:8000/auth/getUser', { params }).subscribe(
        (res: any) => {
          
          this.userName=res.user.fullName;
          this.gstNo=res.user.gstNo;
          this.userData = res.user;
    
          console.log(res.user,'API Response:', this.userData);
  
            
          
        });
  
      }catch (err){
  console.log("CATCH>>>>>>>>")
      }
      
    }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.subscription.unsubscribe();
  }
  // Close menu when the user moves the cursor out of the menu bar
  closeMenuOnMouseLeave() {
    this.isMenuOpen = false;
    this.isDropdownOpen=false
  }
  // Example method to handle login (replace with actual logic)
  login() {
    this.isLoggedIn = true;
  
  }

  // Example method to handle logout (replace with actual logic)
  logout() {
    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigateByUrl('/home')
    // Clear user details
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  navigateToProfile() {
    // Navigate to the profile page
    console.log('Navigate to Profile');
    this.isDropdownOpen = false;
    this.router.navigateByUrl('/profile') 

  }
}
