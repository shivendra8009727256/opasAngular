import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import {ShareDataService} from  '../../share-data.service'



@Component({
  selector: 'app-profile',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
   http = inject(HttpClient);
  profileForm: FormGroup;
  profileImage: any = 'userLogo.png'; // Default image
  userId: any="";
  changePasswordForm:FormGroup
  profileImageFile: any;





  constructor(private fb: FormBuilder, private ShareDataService:ShareDataService) {
    this.userId=localStorage.getItem("userId")?.replace(/"/g, '') || '';

    this.changePasswordForm=this.fb.group({
oldPassword: ['', [Validators.required, Validators.minLength(8)]],
newPassword: ['', [Validators.required, Validators.minLength(8)]],
confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    })
  
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)], // 10-digit phone number
      ],
      
      businessType: ['', Validators.required],
      gstNo: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/)], // GST format
      ],
      companyName: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  ngOnInit(){
    this.getUser()
  }

  getUser() {
    try{
      let params = new HttpParams().set('userId', this.userId);
    this.http.get('http://localhost:8000/auth/getUser', { params }).subscribe(
      (res: any) => {
        console.log('API Response:', res);
  
        if (res.message === 'getUser' && res.user) {
          this.profileForm.patchValue({
            fullName: res.user.fullName || '',
            email: res.user.email || '',
            phoneNumber: res.user.phoneNumber || '',
            businessType: res.user.businessType || '',
            gstNo: res.user.gstNo || '',
            companyName: res.user.companyName || '',
            address: res.user.address || '',
          });
   // Ensure form updates properly
   this.profileForm.markAsPristine();
   this.profileForm.markAsUntouched();
   this.profileForm.updateValueAndValidity();
          
        }
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );

    }catch (err){
console.log("CATCH>>>>>>>>")
    }
    
  }
  
  // // Handle image selection
  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files[0]) {
  //     const file = input.files[0];
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.profileImage = reader.result; // Set the selected image as the profile image
  //     };
  //     reader.readAsDataURL(file); // Read the file as a data URL
  //   }
  // }

   // Handle file selection
   onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileImageFile = file; // Store the File object for upload

      this.profileImage = URL.createObjectURL(file); // Creates a blob URL
    }
    console.log('profileImage is still invalid', this.profileImage);
    console.log('profileImageFile is still invalid', this.profileImageFile);
  }

  ngOnDestroy() {
    if (this.profileImage) {
      URL.revokeObjectURL(this.profileImage); // Free memory
    }
  }
  // Trigger file input click when the edit button is clicked
  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      // console.log('Form is invalid before marking fields', this.profileForm.value);

    // Mark all fields as touched to trigger validation errors
    Object.keys(this.profileForm.controls).forEach(field => {
      const control = this.profileForm.get(field);
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });

    console.log('Form is still invalid', this.profileForm);
    return;
    }
   
   
  // Create FormData object
  const formData = new FormData();
  
  // Append all form fields
  Object.keys(this.profileForm.value).forEach(key => {
    formData.append(key, this.profileForm.value[key]);
  });

  // Append the file if it exists
  if (this.profileImageFile) {
    formData.append('profileImage', this.profileImageFile);
  }
   
  
    this.http.patch(`http://localhost:8000/auth/updateUser/${this.userId}`, formData).subscribe(
      (res:any) => {
        console.log('User data updated successfully', res);
        localStorage.setItem("email", JSON.stringify(res.user?.email));       
        localStorage.setItem("fullName", JSON.stringify(res.user?.fullName));
        localStorage.setItem("businessType", JSON.stringify(res.user?.businessType));
        localStorage.setItem("companyName", JSON.stringify(res.user?.companyName));
        localStorage.setItem("address", JSON.stringify(res.user?.address));       
        localStorage.setItem("phoneNumber", JSON.stringify(res.user?.phoneNumber));      
        localStorage.setItem("gstNo", JSON.stringify(res.user?.gstNo));
        localStorage.setItem("profileImage", res.user?.profileImage);
        console.log('Login Data:', res);
        this.ShareDataService.sendUserData(res);
        console.log('User data emitted:',res);
        alert('Profile updated successfully!');
      },
      (error) => {
        console.error('Error updating user:', error);
        alert('Failed to update profile.');
      }
    );
  }
  

  // Helper method to get form controls for easy access in the template
  get f() {
    return this.profileForm.controls;
  }
  // Helper method to get form controls for easy access in the template
  get ff() {
    return this.changePasswordForm.controls;
  }

  async changePassword(){
  if(this.changePasswordForm.valid){


    if(this.changePasswordForm.value.newPassword ===this.changePasswordForm.value.confirmPassword){
      console.log("MATCH PASSWORD>>>>>>>>",this.changePasswordForm.value.newPassword)
      const obj={
        oldPassword:this.changePasswordForm.value.oldPassword,
        newPassword:this.changePasswordForm.value.newPassword,
        userId:this.userId
      }
      
     await this.http.post("http://localhost:8000/auth/changeUserPassword",obj).subscribe(
        (res:any) => {
          console.log("PASSWORD is match >>>>>>>>",res)
          this.changePasswordForm.reset()
        })

    }else{
      console.log("CHANGE PASSWORD>>>>>>>>",this.changePasswordForm.valid)
    }
  }

  
  

}


}
