import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface Enquiry {
  _id:string;
  srNo: number;
  fullName: string;
  productName: string;
  email: string;
  phoneNumber: string;
  message: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  date?: Date; // Optional date field if your API returns it
}

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  enquiries: Enquiry[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  // Search and filter properties
  searchText: string = '';
  statusFilter: string = '';
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pageSizeOptions = [ 10, 50, 100, 200, -1]; // -1 represents "All"

  statusOptions: ('Pending' | 'In Progress' | 'Resolved')[] = [
    'Pending', 
    'In Progress', 
    'Resolved'
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEnquiries();
  }

  fetchEnquiries(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    // this.http.get<Enquiry[]>("http://localhost:8000/userInquiry/inquiryGet")
    this.http.get<Enquiry[]>("https://opasbizz.in/api/userInquiry/inquiryGet")
      .pipe(
        catchError(error => {
          this.errorMessage = 'Failed to load enquiries. Please try again later.';
          console.error('API Error:', error);
          return of([]); // Return empty array on error
        })
      )
      .subscribe({
        next: (data) => { 
          console.log("INQUIRY DATA GET >>>>",data)
          this.enquiries = data.map((item, index) => ({
            ...item,
            srNo: index + 1, // Generate serial numbers
            date: item.date ? new Date(item.date) : new Date() // Handle date if exists
          }));
          console.log("INQUIRY this.enquiries >>>>",this.enquiries)
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

   updateStatus(id:any, newStatus: 'Pending' | 'In Progress' | 'Resolved') {
        
    const obj={
      id:id,
      status:newStatus
    }
console.log("FOR UPDATE >>>>>>",obj)
    this.http.post("https://opasbizz.in/api/userInquiry/inquiryUpdate",obj).subscribe((res:any)=>{
      console.log(obj,"after UPADTE DATA>>>>",res)
    })
    // this.http.post("http://localhost:8000/userInquiry/inquiryUpadte",obj).subscribe((res:any)=>{
    //   console.log(obj,"after UPADTE DATA>>>>",res)
    // })
  }

  get filteredEnquiries(): Enquiry[] {
    const searchLower = this.searchText.toLowerCase();
    return this.enquiries.filter(enquiry => {
      const statusMatch = this.statusFilter ? 
        enquiry.status === this.statusFilter : true;
      
      if (!this.searchText) return statusMatch;
      
      return (
        enquiry.fullName.toLowerCase().includes(searchLower) ||
        enquiry.email.toLowerCase().includes(searchLower) ||
        enquiry.phoneNumber.includes(this.searchText) ||
        enquiry.productName.toLowerCase().includes(searchLower) ||
        enquiry.status.toLowerCase().includes(searchLower)
      ) && statusMatch;
    });
  }

  get paginatedEnquiries(): Enquiry[] {
    if (this.itemsPerPage === -1) return this.filteredEnquiries;
    if (this.itemsPerPage === 0) return [];
    
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEnquiries.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    if (this.itemsPerPage <= 0) return 0;
    return Math.ceil(this.filteredEnquiries.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  goToEnd(): void {
    this.currentPage = this.totalPages;
  }

 

  getStatusColor(status: string): string {
    switch(status) {
      case 'Pending': return '#ff9800';
      case 'In Progress': return '#2196f3';
      case 'Resolved': return '#4caf50';
      default: return '#9e9e9e';
    }
  }

  clearFilters(): void {
    this.searchText = '';
    this.statusFilter = '';
    this.currentPage = 1;
  }

  getVisiblePages(): number[] {
    const visiblePages: number[] = [];
    const total = this.totalPages;
    const current = this.currentPage;
    
    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        visiblePages.push(i);
      }
    } else {
      if (current <= 3) {
        visiblePages.push(1, 2, 3, 4, -1, total);
      } else if (current >= total - 2) {
        visiblePages.push(1, -1, total - 3, total - 2, total - 1, total);
      } else {
        visiblePages.push(1, -1, current - 1, current, current + 1, -1, total);
      }
    }
    
    return visiblePages;
  }

  refreshData(): void {
    this.fetchEnquiries();
  }
}