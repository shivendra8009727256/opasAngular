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

  
  constructor(private fb: FormBuilder,private router: Router) {
    this.uploadForm = this.fb.group({
      name: ['', [Validators.required]],
      color: ['', [Validators.required]],
      image: [null],
    });
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      color: ['', [Validators.required]],
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
    formData.append('name', this.uploadForm.get('name')?.value);
    formData.append('color', this.uploadForm.get('color')?.value);

    // Append the file
    if (this.fileToUpload) {
      formData.append('image', this.fileToUpload, this.fileToUpload.name);
    }

    // Make the HTTP request to upload the image
    this.http.post('http://localhost:8000/opas/upload', formData).subscribe(
      async (response:any) => {
        this.uploadSuccess = true;
        this.uploadError = false;
        console.log('Image uploaded successfully', response);
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

  updateData(item:any){
    const id=item;
    const obj={

    }

  }

  
   // Update image file and details
   updateImageWithDetails(item: any) {
    const id = item._id;
    const formData = new FormData();
    formData.append('name', item.name);
    formData.append('color', item.color);
    formData.append('details', item.details);

    if (this.fileToUpload) {
      formData.append('image', this.fileToUpload, this.fileToUpload.name);
    }

    this.http.patch(`http://localhost:8000/opas/updateImage/${id}`, formData).subscribe(
      async (response: any) => {
        console.log('Image and details updated successfully', response);
        await this.getAllImage();
      },
      (error) => {
        console.error('Error updating image and details', error);
      }
    );
  }

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
    this.editForm.patchValue({
      name: item.name,
      color: item.color
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
    formData.append('name', this.editForm.get('name')?.value);
    formData.append('color', this.editForm.get('color')?.value);
    
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
