import { NgFor, NgIf, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Carousel } from 'bootstrap';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { SecureStorageService } from '../services/secure-storage.service';
import { LoaderComponent } from "../loader/loader.component";


@Component({
  selector: 'app-home',
 imports: [MatButtonModule, ReactiveFormsModule, NgFor, FormsModule, NgIf, LoaderComponent, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('formContainer') formContainer!: ElementRef;

   isLoading = false;
  name = '';
  mobile = '';
  product = '';
  email = '';
  message = '';
  isSent = false;

  private http = inject(HttpClient);
  uploadForm: FormGroup;
  fileToUpload: File | null = null;
  uploadSuccess = false;
  uploadError = false;
  images: any = [];
  editForm: FormGroup;
  selectedItem: any = null;
  img1: any = null;
  img2: any = null;
  img3: any = null;
  img4: any = null;
  img5: any = null;
  userStatus: string | null;
  hideButton = true;
  userId: string = '';
  userDataStatus: any;
  isBrowser: boolean | undefined;


  bannerImages: string[] = [
    '/homeImages/banner_rice.avif',
    '/homeImages/banner2.avif',
    '/homeImages/banner_wheat.avif',
    '/homeImages/banner_dal.avif',
    '/homeImages/banner_maize.avif',
    '/homeImages/banner3.avif',
  ];



  carouselInstance: any;

  teamMembers = [
    {
      name: 'Rajesh K.',
      position: 'Food Distributor',
      image: '/images/client_img.png',
      description: "Opasbizz has been our trusted supplier for bulk rice for over a year. The quality is consistently excellent, and deliveries are always on time. Highly recommended for businesses looking for a dependable wholesale partner!"
    },
    {
      name: ' Priya M.',
      position: 'Restaurant Chain Owner',
      image: '/images/client_img.png',
      description: "We purchase bulk wheat from Opasbizz regularly, and they never disappoint. Their pricing is competitive, and the grains are clean and well-packaged. A top choice for bulk buyers!"
    },
    {
      name: ' Anil S.',
      position: 'Spice Exporter',
      image: '/images/client_img.png',
      description: "The bulk turmeric and spices from Opasbizz are of exceptional quality. We’ve compared multiple suppliers, and their products stand out in terms of purity and flavor. Will definitely order again!"
    },
    {
      name: ' Meena L.',
      position: 'Livestock Feed Co.',
      image: '/images/client_img.png',
      description: "As a feed manufacturer, we need high-quality corn in large quantities. Opasbizz delivers exactly that—great product, fair pricing, and hassle-free logistics. Very satisfied!"
    }
  ];

  
  categories: string[] = ['Wheat', 'Rice', 'Maize', 'Spices', 'Sugar', 'Pulses'];

  categorySubcategoryMap: { [key: string]: string[] } = {
    Wheat: ['Lokman', 'Milling', 'Sharbati', 'Bansi'],
    Rice: ['Broken Basmati',
      '1401 Basmati',
      '1121 Basmati',
      'Brown Basmati',
      'Golden Basmati',
      'Long Basmati',
      'Medium Basmati',
      'Pusa Basmati',
      'Sella Basmati',
      'Sharbati Basmati',
      'Short Grain Basmati',
      'Sona Masoori Basmati',
      'Sugandha Basmati',
      'Traditional Basmati',
      'White Basmati', '1121 Non Basmati', '1401 Non Basmati', 'Broken Non Basmati', 'Brown Non Basmati', 'Long Grain Non Basmati', 'PR11 Non Basmati', 'PR14 Non Basmati',
      'Pusa Non Basmati', 'AharBati Non Basmati', 'Short Grain Non Basmati', 'Sona Masoori Non Basmati'],
    Maize: ['Dried Maize', 'Natural Maize', 'White Maize', 'Yellow Maize'],
    Spices: ['Chili Powder', 'Turmeric', 'Coriander', 'Cumin'],
    Sugar: ['Brown Sugar', 'White Sugar', 'Coconut Sugar', 'Refined Sugar'],
    Pulses: ['Kabuli Chana', 'Desi Chana', 'Red Lentils', 'Green Lentils', 'Brown Lentils', 'Whole Urad', 'Split Urad', 'Skinned Urad', 'Whole Moong', 'Split Moong', 'Skinned Moong', 'White Pigeon Peas', 'Yellow Pigeon Peas', 'Red Kidney Beans', 'White Kidney Beans', 'Yellow Soyabean', 'Black Soyabean', 'Yellow Split Peas', 'Green Split Peas']

  };

  subcategories: string[] = [];


 constructor(@Inject(PLATFORM_ID) private platformId: Object, private fb: FormBuilder, private router: Router, private secureStorage: SecureStorageService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.userId = this.secureStorage.getItem("userId")?.replace(/"/g, '') || '';
    this.userStatus = this.secureStorage.getItem("userStatus");

    
    this.uploadForm = this.fb.group({
      productName: ['', [Validators.required]],
      price: ['', [Validators.required]],
      businessType: ['', [Validators.required]],
      certification: ['', [Validators.required]],
      cultivationType: ['', [Validators.required]],
      shelfLife: ['', [Validators.required]],
      feature: ['', [Validators.required]],
      moisture: ['', [Validators.required]],
      location: ['', [Validators.required]],
      packagingType: ['', [Validators.required]],
      packSize: ['', [Validators.required]],
      color: ['', [Validators.required]],
      size: ['', [Validators.required]],
      broken: ['', [Validators.required]],
      image: [null],
      // Add these:
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      productNameEdit: ['', [Validators.required]],
      priceEdit: ['', [Validators.required]],
      businessTypeEdit: ['', [Validators.required]],
      certificationEdit: ['', [Validators.required]],
      cultivationTypeEdit: ['', [Validators.required]],
      shelfLifeEdit: ['', [Validators.required]],
      featureEdit: ['', [Validators.required]],
      moistureEdit: ['', [Validators.required]],
      locationEdit: ['', [Validators.required]],
      packagingTypeEdit: ['', [Validators.required]],
      packSizeEdit: ['', [Validators.required]],
      colorEdit: ['', [Validators.required]],
      sizeEdit: ['', [Validators.required]],
      brokenEdit: ['', [Validators.required]],
      image: [null],
      categoryEdit: ['', Validators.required],     // ✅ added
      subcategoryEdit: ['', Validators.required],  // ✅ added

    });

  }
  async ngOnInit() {
  const tasks = [this.getAllImage()];

  if (this.userId && typeof this.userId === 'string' && this.userId.trim() !== '') {
    tasks.push(this.getUserstatus());
  } else {
    console.warn('userId missing or invalid, skipping getUserstatus()');
  }

  await Promise.all(tasks);
}


   ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    const slideshowImages = document.querySelectorAll<HTMLImageElement>(".intro-slideshow img");
    const nextImageDelay = 5000;
    let currentImageCounter = 0;
    if (slideshowImages.length > 0) {
      slideshowImages[currentImageCounter].style.opacity = "1";
      setInterval(() => {
        slideshowImages[currentImageCounter].style.opacity = "0";
        currentImageCounter = (currentImageCounter + 1) % slideshowImages.length;
        slideshowImages[currentImageCounter].style.opacity = "1";
      }, nextImageDelay);
    }
  }


  openModal(): void {
    if (!this.isBrowser) return;
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  closeModal(): void {
    if (!this.isBrowser) return;
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }

   openEditModal(item: any) {
    if (!this.isBrowser) return;
    this.selectedItem = item;
    this.editForm.patchValue({
      productNameEdit: item.productName,
      priceEdit: item.price,
      businessTypeEdit: item.businessType,
      certificationEdit: item.certification,
      cultivationTypeEdit: item.cultivationType,
      shelfLifeEdit: item.shelfLife,
      featureEdit: item.feature,
      moistureEdit: item.moisture,
      locationEdit: item.location,
      packagingTypeEdit: item.packagingType,
      packSizeEdit: item.packSize,
      colorEdit: item.color,
      sizeEdit: item.size,
      brokenEdit: item.broken,
      categoryEdit: item.category,
      subcategoryEdit: item.subcategory,
    });
    const modal = document.getElementById('editModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

   closeEditModal() {
    if (!this.isBrowser) return;
    const modal = document.getElementById('editModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }
onImageLoad(event: Event) {
    if (!this.isBrowser) return;
    const img = event.target as HTMLImageElement;
    img.classList.add('banner-img-loaded');
  }


// Handle file selection
onFileSelected(event: any) {
  this.fileToUpload = event.target.files[0];
}

getAllImage(): Promise<void> {
  return new Promise((resolve, reject) => {
    this.http.get("https://opasbizz.in/api/opas/getImage").subscribe({
      next: (res: any) => {
        this.images = res.data.map((item: any) => ({
          ...item,
          loaded: false
        }));
        resolve();
      },
      error: (err) => {
        console.error("Image fetch failed", err);
        reject(err);
      }
    });
  });
}

onImageLoad1(event: Event) {
  if (!this.isBrowser) return;
  const img = event.target as HTMLImageElement;
  const productName = img.nextElementSibling?.textContent?.trim();
  const index = this.images.findIndex((item: { image: string }) =>
    'https://opasbizz.in/api/uploads/' + item.image === img.src
  );
  if (index !== -1) {
    this.images[index].loaded = true;
  }
}

onCategoryChange(event: any) {
  const selectedCategory = event.target.value;
  this.subcategories = this.categorySubcategoryMap[selectedCategory] || [];
  this.uploadForm.patchValue({ subcategory: '' });
}

onCategoryEditChange(event: Event): void {
  const selectedCategory = (event.target as HTMLSelectElement).value;
  this.filteredEditSubcategories = this.categorySubcategoryMap[selectedCategory] || [];
}

getUserstatus(): Promise<void> {
  return new Promise((resolve, reject) => {
    // ✅ Validate userId format (MongoDB ObjectId = 24 chars)
    if (!this.userId || typeof this.userId !== 'string' || this.userId.trim().length !== 24) {
      console.warn(' getUserstatus() blocked — invalid userId:', this.userId);
      resolve();
      return;
    }

    const params = new HttpParams().set('userId', this.userId);
    this.http.get('https://opasbizz.in/api/auth/getUser', { params }).subscribe({
      next: (res: any) => {
        this.userDataStatus = res?.user?.userStatus || null;
        this.hideButton = this.userDataStatus !== "admin";
        resolve();
      },
      error: (err) => {
        console.error('Status fetch failed:', err);
        reject(err);
      }
    });
  });
}




onSubmit() {
  if (this.uploadForm.invalid) return;

  const formData = new FormData();
  for (const field of [
    'productName','color','size','broken','price','businessType','certification','cultivationType',
    'shelfLife','feature','moisture','location','packagingType','packSize','category','subcategory']) {
    formData.append(field, this.uploadForm.get(field)?.value);
  }

  if (this.fileToUpload) {
    formData.append('image', this.fileToUpload, this.fileToUpload.name);
  }

  this.http.post('https://opasbizz.in/api/opas/upload', formData).subscribe({
    next: async () => {
      this.uploadSuccess = true;
      this.uploadError = false;
      await this.uploadForm.reset();
      await this.getAllImage();
    },
    error: (error) => {
      this.uploadError = true;
      this.uploadSuccess = false;
      console.error('Error uploading image', error);
    }
  });
}  

deleteData(item: any) {
  const id = item;
  this.http.delete("https://opasbizz.in/api/opas/delete/" + id).subscribe({
    next: async () => await this.getAllImage()
  });
}

onEditSubmit() {
  if (this.editForm.invalid || !this.selectedItem) return;

  const formData = new FormData();
  for (const field of [
    'productNameEdit','priceEdit','businessTypeEdit','certificationEdit','cultivationTypeEdit','shelfLifeEdit',
    'featureEdit','moistureEdit','locationEdit','packagingTypeEdit','packSizeEdit','colorEdit','sizeEdit',
    'brokenEdit','categoryEdit','subcategoryEdit']) {
    formData.append(field.replace('Edit',''), this.editForm.get(field)?.value);
  }

  if (this.fileToUpload) {
    formData.append('image', this.fileToUpload, this.fileToUpload.name);
  }

  this.http.patch(`https://opasbizz.in/api/opas/updateImage/${this.selectedItem._id}`, formData).subscribe({
    next: async () => {
      await this.getAllImage();
      this.closeEditModal();
    },
    error: (error) => console.error('Error updating image', error)
  });
}

goToProduct(item: any) {
  if (!item) {
    console.error('Product is undefined');
    return;
  }
  const formatted = item.subcategory;
  this.router.navigate(['/product', formatted]);
}

isFormValid(): boolean {
  return this.name.trim() !== '' && this.email.trim() !== '' && this.email.includes('@');
}

sendLetter(): void {
  if (!this.isFormValid()) return;
  this.isLoading = true;

  const obj = {
    fullName: this.name,
    email: this.email,
    productName: this.product,
    phoneCode: "formValue.phoneCode",
    phoneNumber: this.mobile,
    message: this.message,
    status: "Pending",
    userId: this.userId || null
  };

  this.http.post("https://opasbizz.in/api/userInquiry/inquirySave", obj).subscribe({
    next: async (res: any) => {
      if (res) {
        this.isSent = true;
        setTimeout(() => {
          this.resetForm();
        }, 5000);
      }
    },
    error: (err) => {
      this.isLoading = false;
    }
  });
}


  

 



 

  onImageError(event: Event) {
    // const img = event.target as HTMLImageElement;
    // img.src = '/assets/image-placeholder.png'; // Fallback image
  }


 

  categoriesEdit: string[] = Object.keys(this.categorySubcategoryMap);

  filteredEditSubcategories: string[] = [];

  

private resetForm(): void {
  this.name = '';
  this.mobile = '';
  this.product = '';
  this.email = '';
  this.message = '';
  this.isSent = false;
  this.isLoading = false;
}

  
 


}
