import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { user } from '../../model/user';
import { MasterService } from '../../../service/master.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [NgIf, FormsModule, ReactiveFormsModule, NgFor,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  submitted = false;
  loginForm: FormGroup;
  registerForm: FormGroup;


  countries = [
    { name: 'India', code: '+91' },
    { name: 'United States', code: '+1' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'Australia', code: '+61' },
    { name: 'Canada', code: '+1' },
    
    { name: 'South Africa', code: '+27' },
    { name: 'Russia', code: '+7' },
    
   
   
    { name: 'South Korea', code: '+82' },
    { name: 'New Zealand', code: '+64' },
  ]
  

  // Default selected country (India)
  selectedCountry = signal<string>('India');
  selectedCountryCode = signal<string>('+91');

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      country: ['India', [Validators.required]],  // ✅ Set Default Country to India
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      businessType: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }

  loginUser: user = new user;
  masterSer = inject(MasterService);
  router = inject(Router);
  http = inject(HttpClient);
  isLoginActive: boolean = true;

  toggleForm(type: string) {
    this.isLoginActive = type === 'login';
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    
    console.log("LOGIN FORM >>>>>", this.loginForm.value);
    this.masterSer.login(this.loginForm.value).subscribe((res: any) => {
      try {
        if (res) {
          console.log('<<<<<<<<<<<<<<<<<...RSPONCE....>>>>>>>>>>>>>>>>>>>>>>',res);
          localStorage.setItem("email", JSON.stringify(res.user?.email));
          localStorage.setItem("isActive", JSON.stringify(res.user?.isActive));
          localStorage.setItem("fullName", JSON.stringify(res.user?.fullName));
          localStorage.setItem("businessType", JSON.stringify(res.user?.businessType));
          localStorage.setItem("companyName", JSON.stringify(res.user?.companyName));
          localStorage.setItem("address", JSON.stringify(res.user?.address));
          localStorage.setItem("token", JSON.stringify(res.token));
          localStorage.setItem("phoneNumber", JSON.stringify(res.user?.phoneNumber));
          localStorage.setItem("userId", JSON.stringify(res.user?._id));
          console.log('Login Data:', res);

          this.router.navigateByUrl("/dashboard");
        } else {
          console.log('<<<<<<<<<<<<<<<<<.......>>>>>>>>>>>>>>>>>>>>>>');
        }
      } catch (err) {
        console.log("ERROR>>>>", err);
      }
    });
  }

  getData() {
    this.masterSer.getData().subscribe((res: any) => {
      this.router.navigateByUrl("/header/dashboard");
    });
  }

  onCountryChange(event: any) {
    const selected = event.target.value;
    this.selectedCountry.set(selected);

    const country = this.countries.find(c => c.name === selected);
    if (country) {
      this.selectedCountryCode.set(country.code);
      this.registerForm.patchValue({ country: selected });
    }
    
  }
  

  register() {
    if (this.registerForm.invalid) return;
     // Find the country code based on the selected country
  const selectedCountryName = this.registerForm.value.country;
  const selectedCountryData = this.countries.find(c => c.name === selectedCountryName);
  const countryCode = selectedCountryData ? selectedCountryData.code : '';
  const obj1 = {
    fullName: this.registerForm.value.fullName,
    email: this.registerForm.value.email,
    phoneNumber: this.registerForm.value.phoneNumber,
    password: this.registerForm.value.password,
    businessType: this.registerForm.value.businessType,
    companyName: this.registerForm.value.companyName,
    address: this.registerForm.value.address,
    country: selectedCountryName,  
    countryCode: countryCode       
  };
console.log("OBJ>>>>>>>>>>",obj1)
    try {
      this.http.post("http://localhost:8000/auth/register", obj1).subscribe(async(res: any) => {
        alert("Registration Successful");
        console.log(">>>>>>>>>>>>", res);
        this.registerForm.reset({ country: 'India' }); 
       await this.router.navigateByUrl('/register') // ✅ Reset with Default Country
      });
    } catch (err) {
      console.log("ERR>>>>>>>>>>", err);
    }
  }
}
