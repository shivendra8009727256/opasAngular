import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'
@Component({
  selector: 'app-home',
  imports: [MatButtonModule,ReactiveFormsModule],
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
  img1:any=null;
  img2:any=null;
  img3:any=null;
  img4:any=null;
  img5:any=null;

  
  constructor(private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
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

  
}
