import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [MatButtonModule,ReactiveFormsModule,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private http = inject(HttpClient);
  uploadForm: FormGroup;
  fileToUpload: File | null = null;
  uploadSuccess = false;
  uploadError = false;
  images: any=[];
  editForm: FormGroup;
  selectedItem: any = null;
  img1:any=null;
  img2:any=null;
  img3:any=null;
  img4:any=null;
  img5:any=null;
  userStatus: string | null;

  
  constructor(private fb: FormBuilder,private router: Router) {
    this.userStatus=localStorage.getItem("userStatus")
    console.log("UserSTATUS>>>>>>>>>>>",this.userStatus)
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

  ngOnInit(){
    this.getAllImage()
  }
  getAllImage(){
    this.http.get("http://localhost:8000/opas/getImage").subscribe((res:any)=>{
      this.images = res.data; // Store the fetched images
      console.log('Images fetched successfully', this.images);
    })
  }
   


   // Submit the form
  onSubmit() {
    console.log("THIS>?>>>>>>>>>>",this.uploadForm.value)
    if (this.uploadForm.invalid) {
      console.log("THIS>?>>>>>>>>>>",this.uploadForm.value)
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
   

    // Append the file
    if (this.fileToUpload) {
      formData.append('image', this.fileToUpload, this.fileToUpload.name);
    }

    // Make the HTTP request to upload the image
    this.http.post('http://localhost:8000/opas/upload', formData).subscribe(
      async (response:any) => {
        this.uploadSuccess = true;
        this.uploadError = false;
       await this.uploadForm.reset()
        console.log('Product uploaded successfully', response);
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
  async deleteData(item:any){
    const id=item;
   await this.http.delete("http://localhost:8000/opas/delete/"+id).subscribe(async (res:any)=>{
      console.log("DELETE API>>>>>>>",res)
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

  //   this.http.patch(`http://localhost:8000/opas/updateImage/${id}`, formData).subscribe(
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
    console.log("ITEM>>>>>>>",this.selectedItem)
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
    
    if (this.fileToUpload) {
      formData.append('image', this.fileToUpload, this.fileToUpload.name);
    }

    this.http.patch(`http://localhost:8000/opas/updateImage/${this.selectedItem._id}`, formData).subscribe(
      async () => {
        console.log('Image updated successfully');
        await this.getAllImage();
        this.closeEditModal();
      },
      (error) => {
        console.error('Error updating image', error);
      }
    );
  }

  ///////////////send to product page //////////////////
  goToProduct(item: any) {
    this.router.navigate(['/product', item._id], { state: { product: item } });
  }
  
}
