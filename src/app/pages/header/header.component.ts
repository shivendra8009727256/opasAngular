import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ShareDataService } from '../../share-data.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SecureStorageService } from '../../services/secure-storage.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  http = inject(HttpClient);
  router = inject(Router);
  userData: any = null;
  private subscription: Subscription = new Subscription();
  lastScrollY = 0;
  isHidden = false;
  isMenuOpen = false;
  isLoggedIn = true;
  isDropdownOpen = false;
  userName: string | null = null;
  gstNo: string | null;
  userId: string = '';
  userDataStatus: any;
  hideButton: boolean = true;

  constructor(
    private ShareDataService: ShareDataService,
    private secureStorage: SecureStorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const rawUserName = this.secureStorage.getItem("fullName")?.replace(/"/g, '') || '';
    this.userId = this.secureStorage.getItem("userId")?.replace(/"/g, '') || '';
    this.userName = rawUserName
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    this.gstNo = this.secureStorage.getItem("gstNo")?.replace(/"/g, '') || '';
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.lastScrollY = window.scrollY;
    }

    if (this.userId && this.userId.trim().length === 24) {
      this.getUser();
    } else {
      console.warn('Invalid or missing userId, skipping getUser()');
    }

    this.subscription = this.ShareDataService.userData$.subscribe(async (data) => {
      this.userData = data.user;
      await this.login();
      this.userName = this.userData.fullName
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      this.gstNo = this.userData.gstNo?.replace(/"/g, '') || '';
    });
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const currentScrollY = window.scrollY;
      this.isHidden = currentScrollY > this.lastScrollY && currentScrollY > 50;
      this.lastScrollY = currentScrollY;
    }
  }

  @HostListener('document:click', ['$event'])
  closeMenuOnClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('nav')) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  closeMenuOnMouseLeave() {
    this.isMenuOpen = false;
    this.isDropdownOpen = false;
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
    this.secureStorage.clear();
    this.router.navigateByUrl('/home');
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  navigateToProfile() {
    this.isDropdownOpen = false;
    this.router.navigateByUrl('/profile');
  }

  navigateToHistory() {
    this.isDropdownOpen = false;
    this.router.navigateByUrl('/history');
  }

  navigateToEnquiry() {
    this.isDropdownOpen = false;
    this.router.navigateByUrl('/enquiry');
  }

  getUser() {
    if (!this.userId || this.userId.trim().length !== 24) {
      console.warn('getUser() blocked — invalid userId:', this.userId);
      return;
    }

    const params = new HttpParams().set('userId', this.userId);
    this.http.get('https://opasbizz.in/api/auth/getUser', { params }).subscribe({
      next: (res: any) => {
        this.userName = res.user.fullName;
        this.gstNo = res.user.gstNo;
        this.userData = res.user;
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
  }

  getUserstatus() {
    if (!this.userId || this.userId.trim().length !== 24) {
      console.warn('getUserstatus() blocked — invalid userId:', this.userId);
      return;
    }

    const params = new HttpParams().set('userId', this.userId);
    this.http.get('https://opasbizz.in/api/auth/getUser', { params }).subscribe({
      next: (res: any) => {
        this.userDataStatus = res.user.userStatus;
        this.hideButton = this.userDataStatus !== "admin";
      },
      error: (err) => {
        console.error('❌ Error fetching user status:', err);
      }
    });
  }

  hoveredCategory: string | null = null;
  activeSubCategory: string | null = null;
  activeSubSubCategory: string | null = null;

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

  showSubCategory(sub: string) {
    this.activeSubCategory = sub;
  }

  hideSubCategory() {
    this.activeSubCategory = null;
    this.activeSubSubCategory = null;
  }

  showSubSubCategory(subSub: string) {
    this.activeSubSubCategory = subSub;
  }

  hideSubSubCategory() {
    this.activeSubSubCategory = null;
  }

  goToProduct(product: string | undefined) {
    if (!product) {
      console.error('Product is undefined');
      return;
    }
    const formatted = product;
    this.router.navigate(['/product', formatted]);
  }
}
