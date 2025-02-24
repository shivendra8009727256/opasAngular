import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
email: string | null;
  fullName: string | null;
  companyName: string | null;
  address: string | null;
  businessType: string | null;
  isActive: string | null;
constructor(){
  this.fullName=localStorage.getItem("fullName")
  this.email=localStorage.getItem("email")
  this.companyName=localStorage.getItem("companyName")
  this.address=localStorage.getItem("address")
  this.isActive=localStorage.getItem("isActive")
  this.businessType=localStorage.getItem("businessType")
}
}
