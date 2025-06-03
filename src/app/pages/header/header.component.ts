import { NgIf } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import{ShareDataService} from '../../share-data.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SecureStorageService } from '../../services/secure-storage.service';

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
   userDataStatus: any;
   hideButton: boolean = true

 

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


   constructor(private ShareDataService:ShareDataService ,private secureStorage: SecureStorageService){
   // Retrieve values from localStorage and remove double quotes
const rawUserName = this.secureStorage.getItem("fullName")?.replace(/"/g, '') || '';

this.userId = this.secureStorage.getItem("userId")?.replace(/"/g, '') || '';

// Capitalize the first letter of each word in the name
this.userName = rawUserName
  .split(' ') // Split the name into an array of words
  .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
  .join(' '); // Join the words back into a single string

this.gstNo = this.secureStorage.getItem("gstNo")?.replace(/"/g, '') || '';
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
      this.http.get('https://opasbizz.in/api/auth/getUser', { params }).subscribe(
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
    this.secureStorage.clear();
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
  navigateToHistory() {
    // Navigate to the profile page
    console.log('Navigate to Profile');
    this.isDropdownOpen = false;
    this.router.navigateByUrl('/history') 

  }
  navigateToEnquiry() {
    // Navigate to the profile page
    console.log('Navigate to Enquiry');
    this.isDropdownOpen = false;
    this.router.navigateByUrl('/enquiry') 

  }

  getUserstatus() {
    try {
      let params = new HttpParams().set('userId', this.userId);
      this.http.get('https://opasbizz.in/api/auth/getUser', { params }).subscribe(
        (res: any) => {

          this.userDataStatus = res.user.userStatus


          console.log('API Response:>>>>>>>>>>>>>>>>>>', this.userDataStatus)
          console.log(this.userDataStatus === "admin")
          if (this.userDataStatus == "user") {
            this.hideButton = true
            console.log("11111111111111111")
          } else if (this.userDataStatus == "admin") {
            this.hideButton = false
            console.log("2222222222222222222222222222")
          } else {
            this.hideButton = true
            console.log("333333333333333333333333333")
          }


        });

    } catch (err) {
      console.log("CATCH>>>>>>>>")
    }

  }

  hoveredCategory: string | null = null;
activeSubCategory: string | null = null;
activeSubSubCategory: string | null = null;

// First-level dropdown (PRODUCTS)
showCategory(category: string) {
  this.hoveredCategory = category;
}

hideCategory(category: string) {
  if (this.hoveredCategory === category) {
    this.hoveredCategory = null;
    this.activeSubCategory = null;
    this.activeSubSubCategory = null;
  }
}

// Second-level dropdowns (Wheat, Rice, etc.)
showSubCategory(sub: string) {
  this.activeSubCategory = sub;
}

hideSubCategory() {
  this.activeSubCategory = null;
  this.activeSubSubCategory = null;
}

// Third-level dropdowns (Basmati, Non-Basmati)
showSubSubCategory(subSub: string) {
  this.activeSubSubCategory = subSub;
}

hideSubSubCategory() {
  this.activeSubSubCategory = null;
}

 ///////////////send to product page //////////////////
//  Use Query Params
// goToProduct(item: string) {
//   const formattedItem = item.toLowerCase().replace(/\s+/g, '-');
//   this.router.navigate(['/products'], { queryParams: { item: formattedItem } });
// }

// //Router Params
goToProduct(product: string | undefined) {
  if (!product) {
    console.error('Product is undefined');
    return;
  }

  const formatted = product.toLowerCase().replace(/\s+/g, '-');
  this.router.navigate(['/product', formatted]);
}


}
