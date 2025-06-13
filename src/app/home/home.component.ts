import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Carousel } from 'bootstrap';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { SecureStorageService } from '../services/secure-storage.service';

declare var bootstrap: any; // Import Bootstrap for TypeScript
@Component({
  selector: 'app-home',
  imports: [MatButtonModule, ReactiveFormsModule, NgFor, FormsModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('carousel') carousel!: ElementRef;
  ///////////////////////////
  @ViewChild('formContainer') formContainer!: ElementRef;

  name: string = '';
  mobile: string = '';
  product: string = '';
  email: string = '';
  message: string = '';
  isSent: boolean = false;
  ///////////////////////////////////////////////
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
  hideButton: boolean = true
  userId: any
  userDataStatus: any;


bannerImages: string[] = [
  '/homeImages/banner_rice.webp',
  '/homeImages/banner2.webp',
  '/homeImages/banner_wheat.webp',
  '/homeImages/banner_dal.webp',
  '/homeImages/banner_maize.webp',
  '/homeImages/banner3.webp',
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

  // initCarousel() {
  //   this.carouselInstance = new Carousel(this.carousel.nativeElement, {
  //     interval: 3000, // Auto-slide every 3 seconds
  //     ride: 'carousel',
  //     wrap: true
  //   });
  // }





  // //////////////
  categories: string[] = ['Wheat', 'Rice', 'Maize', 'Spices', 'Sugar','Pulses'];

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


  constructor(private fb: FormBuilder, private router: Router, private secureStorage: SecureStorageService) {
    this.userId = this.secureStorage.getItem("userId")?.replace(/"/g, '') || '';
    this.userStatus = this.secureStorage.getItem("userStatus")
    // console.log("UserSTATUS>>>>>>>>>>>", typeof (this.userStatus))
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

  // Handle file selection
  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
  }
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
  // img1=this.images[0].image
  // this.img2="/best_logo1.png"
  // this.img3="/logo3.png"
  // this.img4="/opasLogo.png"
  // this.img5="/logo3.png"

  async ngOnInit() {
    // Initialize carousel after view is initialized
    // setTimeout(() => {
    //   this.initCarousel();
    // });


    this.getAllImage()
    await this.getUserstatus()
  }
  // getAllImage() {
  //   this.http.get("https://opasbizz.in/api/opas/getImage").subscribe(async (res: any) => {
  //     this.images = res.data; // Store the fetched images
  //     console.log('Images fetched successfully', this.images);
  //     await this.getUserstatus()
  //   })
  // }

  getAllImage() {
  this.http.get("https://opasbizz.in/api/opas/getImage").subscribe(async (res: any) => {
    this.images = res.data.map((item: any) => ({
      ...item,
      loaded: false // default state
    }));
    // console.log('Images fetched successfully', this.images);
    await this.getUserstatus();
  });
}


  onImageLoad1(event: Event) {
  const img = event.target as HTMLImageElement;
  const productName = img.nextElementSibling?.textContent?.trim(); // Optional if needed

  // Find matching item and mark loaded true
  const index = this.images.findIndex((item: { image: string; }) =>
    'https://opasbizz.in/api/uploads/' + item.image === img.src
  );
  if (index !== -1) {
    this.images[index].loaded = true;
  }
}

onImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = '/assets/image-placeholder.png'; // Fallback image
}


  onCategoryChange(event: any) {
    const selectedCategory = event.target.value;
    this.subcategories = this.categorySubcategoryMap[selectedCategory] || [];

    // Reset subcategory if category changes
    this.uploadForm.patchValue({ subcategory: '' });
  }

  categoriesEdit: string[] = Object.keys(this.categorySubcategoryMap);

  filteredEditSubcategories: string[] = [];

  onCategoryEditChange(event: Event): void {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    this.filteredEditSubcategories = this.categorySubcategoryMap[selectedCategory] as string[] || [];
  }



  getUserstatus() {
    try {
      let params = new HttpParams().set('userId', this.userId);
      this.http.get('https://opasbizz.in/api/auth/getUser', { params }).subscribe(
        (res: any) => {

          this.userDataStatus = res.user.userStatus


          // console.log("USER STATUS>>>>", res.user, 'API Response:>>>>>>>>>>>>>>>>>>', this.userDataStatus)
          // console.log(this.userDataStatus === "admin")
          if (this.userDataStatus == "user") {
            this.hideButton = true
            // console.log("11111111111111111")
          } else if (this.userDataStatus == "admin") {
            this.hideButton = false
            // console.log("2222222222222222222222222222")
          } else {
            this.hideButton = true
            // console.log("333333333333333333333333333")
          }


        });

    } catch (err) {
      // console.log("CATCH>>>>>>>>")
    }

  }



  // Submit the form
  onSubmit() {
    // console.log("THIS>?>>>>>>>>>>", this.uploadForm.value)
    if (this.uploadForm.invalid) {
      // console.log("THIS>?>>>>>>>>>>", this.uploadForm.value)
      return;
    }


    const formData = new FormData();
    formData.append('productName', this.uploadForm.get('productName')?.value);
    formData.append('color', this.uploadForm.get('color')?.value);
    formData.append('size', this.uploadForm.get('size')?.value);
    formData.append('broken', this.uploadForm.get('broken')?.value);
    formData.append('price', this.uploadForm.get('price')?.value);
    formData.append('businessType', this.uploadForm.get('businessType')?.value);
    formData.append('certification', this.uploadForm.get('certification')?.value);
    formData.append('cultivationType', this.uploadForm.get('cultivationType')?.value);
    formData.append('shelfLife', this.uploadForm.get('shelfLife')?.value);
    formData.append('feature', this.uploadForm.get('feature')?.value);
    formData.append('moisture', this.uploadForm.get('moisture')?.value);
    formData.append('location', this.uploadForm.get('location')?.value);
    formData.append('packagingType', this.uploadForm.get('packagingType')?.value);
    formData.append('packSize', this.uploadForm.get('packSize')?.value);
    // ✅ New: Add category and subcategory
    formData.append('category', this.uploadForm.get('category')?.value);
    formData.append('subcategory', this.uploadForm.get('subcategory')?.value);


    // Append the file
    if (this.fileToUpload) {
      formData.append('image', this.fileToUpload, this.fileToUpload.name);
    }

    // Make the HTTP request to upload the image
    // online API URL > this.http.post('https://opasbizz.in/api/opas/upload', formData).subscribe(
    this.http.post('https://opasbizz.in/api/opas/upload', formData).subscribe(
      async (response: any) => {
        this.uploadSuccess = true;
        this.uploadError = false;
        await this.uploadForm.reset()
        // console.log('Product uploaded successfully', response);
        await this.getAllImage()
      },
      (error) => {
        this.uploadError = true;
        this.uploadSuccess = false;
        console.error('Error uploading image', error);
      }
    );
  }
  //////delete data /////////
  async deleteData(item: any) {
    const id = item;
    // console.log("ITEM SELECTED >>FOR DELETE>>>>>>>>", id)
    await this.http.delete("https://opasbizz.in/api/opas/delete/" + id).subscribe(async (res: any) => {
      // console.log("DELETE API>>>>>>>", res)
      await this.getAllImage()
    })

  }




  // Update image file and details
  //  updateImageWithDetails(item: any) {
  //   const id = item._id;
  //   const formData = new FormData();
  //   formData.append('name', item.name);
  //   formData.append('color', item.color);
  //   formData.append('details', item.details);

  //   if (this.fileToUpload) {
  //     formData.append('image', this.fileToUpload, this.fileToUpload.name);
  //   }

  //   this.http.patch(`https://opasbizz.in/api/opas/updateImage/${id}`, formData).subscribe(
  //     async (response: any) => {
  //       console.log('Image and details updated successfully', response);
  //       await this.getAllImage();
  //     },
  //     (error) => {
  //       console.error('Error updating image and details', error);
  //     }
  //   );
  // }

  openModal(): void {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  closeModal(): void {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }

  openEditModal(item: any) {
    this.selectedItem = item;
    // console.log("ITEM>>>>>>>", this.selectedItem)
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
    const modal = document.getElementById('editModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }



  onEditSubmit() {
    if (this.editForm.invalid || !this.selectedItem) return;

    const formData = new FormData();
    formData.append('productName', this.editForm.get('productNameEdit')?.value);
    formData.append('price', this.editForm.get('priceEdit')?.value);
    formData.append('businessType', this.editForm.get('businessTypeEdit')?.value);
    formData.append('certification', this.editForm.get('certificationEdit')?.value);
    formData.append('cultivationType', this.editForm.get('cultivationTypeEdit')?.value);
    formData.append('shelfLife', this.editForm.get('shelfLifeEdit')?.value);
    formData.append('feature', this.editForm.get('featureEdit')?.value);
    formData.append('moisture', this.editForm.get('moistureEdit')?.value);
    formData.append('location', this.editForm.get('locationEdit')?.value);
    formData.append('packagingType', this.editForm.get('packagingTypeEdit')?.value);
    formData.append('packSize', this.editForm.get('packSizeEdit')?.value);
    formData.append('color', this.editForm.get('colorEdit')?.value);
    formData.append('size', this.editForm.get('sizeEdit')?.value);
    formData.append('broken', this.editForm.get('brokenEdit')?.value);
    formData.append('category', this.editForm.get('categoryEdit')?.value);
    formData.append('subcategory', this.editForm.get('subcategoryEdit')?.value);
    // ✅ Console log all formData key-value pairs
    for (const pair of formData.entries()) {
      // console.log(`${pair[0]}: ${pair[1]}`);
    }

    // console.log("EDIT DATA >>>>>>>>>>>>", formData)
    if (this.fileToUpload) {
      formData.append('image', this.fileToUpload, this.fileToUpload.name);
    }

    this.http.patch(`https://opasbizz.in/api/opas/updateImage/${this.selectedItem._id}`, formData).subscribe(
      async () => {
        // console.log('Image updated successfully');
        await this.getAllImage();
        this.closeEditModal();
      },
      (error) => {
        // console.error('Error updating image', error);
      }
    );
  }

  ///////////////send to product page //////////////////
  goToProduct(item: any) {
    // this.router.navigate(['/product', item._id], { state: { product: item } });
    if (!item) {
      console.error('Product is undefined');
      return;
    }

    const formatted = item.subcategory;
    // console.log("@@@@@@@@@@@@@@", item)
    this.router.navigate(['/product', formatted]);
  }

  // ?/////////////////////email card ////////////////
  isFormValid(): boolean {
    return this.name.trim() !== '' && this.email.trim() !== '' && this.email.includes('@');
  }

  sendLetter(): void {
    if (!this.isFormValid()) return;
    const obj = {
      fullName: this.name,
      email: this.email,
      productName: this.product,
      phoneCode: "formValue.phoneCode",
      phoneNumber: this.mobile,
      message: this.message,
      status: "pending",
      userId: this.userId || null
    };
    // console.log(" send DATA OF ENQUIRY API>>>>>>>>>", obj);
    this.http.post("https://opasbizz.in/api/userInquiry/inquirySave", obj).subscribe({
      next: async (res: any) => {
        if (res) {
          this.isSent = true;
          // console.log("IF USER IS LOG IN >>>>>>>>", res)
          // Reset form after animation completes
          setTimeout(() => {
            this.resetForm();
            let i=0;
            console.log(i+1)
          }, 5000);
        }
      },
      error: (err) => {
        // this.openSnackBar("Error submitting form. Please try again.", "close");
        // console.error("Submission error:", err);
      }
    });
    // this.isSent = true;

    // // Optional: You could send the data to a service here
    // console.log('Form submitted:', {
    //   name: this.name,
    //   mobile: this.mobile,
    //   email: this.email,
    //   message: this.message
    // });

    // Reset form after animation completes
    // setTimeout(() => {
    //   this.resetForm();
    // }, 6000);
  }

  private resetForm(): void {
    this.name = '';
    this.mobile = '';
    this.product = '';
    this.email = '';
    this.message = '';
    this.isSent = false;
  }
  //////////////////////////email card end //////////////////////////
  onImageLoad(event: Event) {
  const img = event.target as HTMLImageElement;
  img.classList.add('banner-img-loaded');
}


}
