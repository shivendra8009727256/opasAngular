import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Enquiry {
  srNo: number;
  name: string;
  productName: string;
  email: string;
  phoneNumber: string;
  message: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
}

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent {
  enquiries: Enquiry[] = [
    {
      srNo: 1,
      name: 'John Doe',
      productName: 'Angular Course',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      message: 'Want to compare Angular and React Interested in learning Angular Want to compare Angular and React',
      status: 'Pending'
    },
    {
      srNo: 2,
      name: 'Jane Smith',
      productName: 'React Course',
      email: 'jane@example.com',
      phoneNumber: '9876543210',
      message: 'Want to compare Angular and React Want to compare Angular and React Want to compare Angular and React',
      status: 'In Progress'
    },
    {
      srNo: 3,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 4,
      name: 'Mike Johnson',
      productName: 'Vue dfdfdffff Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 5,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 1,
      name: 'John Doe',
      productName: 'Angular Course',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      message: 'Want to compare Angular and React Interested in learning Angular Want to compare Angular and React',
      status: 'Pending'
    },
    {
      srNo: 2,
      name: 'Jane Smith',
      productName: 'React Course',
      email: 'jane@example.com',
      phoneNumber: '9876543210',
      message: 'Want to compare Angular and React Want to compare Angular and React Want to compare Angular and React',
      status: 'In Progress'
    },
    {
      srNo: 3,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 4,
      name: 'Mike Johnson',
      productName: 'Vue dfdfdffff Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 5,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 1,
      name: 'John Doe',
      productName: 'Angular Course',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      message: 'Want to compare Angular and React Interested in learning Angular Want to compare Angular and React',
      status: 'Pending'
    },
    {
      srNo: 2,
      name: 'Jane Smith',
      productName: 'React Course',
      email: 'jane@example.com',
      phoneNumber: '9876543210',
      message: 'Want to compare Angular and React Want to compare Angular and React Want to compare Angular and React',
      status: 'In Progress'
    },
    {
      srNo: 3,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 4,
      name: 'Mike Johnson',
      productName: 'Vue dfdfdffff Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 5,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 1,
      name: 'John Doe',
      productName: 'Angular Course',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      message: 'Want to compare Angular and React Interested in learning Angular Want to compare Angular and React',
      status: 'Pending'
    },
    {
      srNo: 2,
      name: 'Jane Smith',
      productName: 'React Course',
      email: 'jane@example.com',
      phoneNumber: '9876543210',
      message: 'Want to compare Angular and React Want to compare Angular and React Want to compare Angular and React',
      status: 'In Progress'
    },
    {
      srNo: 3,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 4,
      name: 'Mike Johnson',
      productName: 'Vue dfdfdffff Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 5,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 1,
      name: 'John Doe',
      productName: 'Angular Course',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      message: 'Want to compare Angular and React Interested in learning Angular Want to compare Angular and React',
      status: 'Pending'
    },
    {
      srNo: 2,
      name: 'Jane Smith',
      productName: 'React Course',
      email: 'jane@example.com',
      phoneNumber: '9876543210',
      message: 'Want to compare Angular and React Want to compare Angular and React Want to compare Angular and React',
      status: 'In Progress'
    },
    {
      srNo: 3,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 4,
      name: 'Mike Johnson',
      productName: 'Vue dfdfdffff Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 5,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 1,
      name: 'John Doe',
      productName: 'Angular Course',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      message: 'Want to compare Angular and React Interested in learning Angular Want to compare Angular and React',
      status: 'Pending'
    },
    {
      srNo: 2,
      name: 'Jane Smith',
      productName: 'React Course',
      email: 'jane@example.com',
      phoneNumber: '9876543210',
      message: 'Want to compare Angular and React Want to compare Angular and React Want to compare Angular and React',
      status: 'In Progress'
    },
    {
      srNo: 3,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 4,
      name: 'Mike Johnson',
      productName: 'Vue dfdfdffff Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 5,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 1,
      name: 'John Doe',
      productName: 'Angular Course',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      message: 'Want to compare Angular and React Interested in learning Angular Want to compare Angular and React',
      status: 'Pending'
    },
    {
      srNo: 2,
      name: 'Jane Smith',
      productName: 'React Course',
      email: 'jane@example.com',
      phoneNumber: '9876543210',
      message: 'Want to compare Angular and React Want to compare Angular and React Want to compare Angular and React',
      status: 'In Progress'
    },
    {
      srNo: 3,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 4,
      name: 'Mike Johnson',
      productName: 'Vue dfdfdffff Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 5,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 1,
      name: 'John Doe',
      productName: 'Angular Course',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      message: 'Want to compare Angular and React Interested in learning Angular Want to compare Angular and React',
      status: 'Pending'
    },
    {
      srNo: 2,
      name: 'Jane Smith',
      productName: 'React Course',
      email: 'jane@example.com',
      phoneNumber: '9876543210',
      message: 'Want to compare Angular and React Want to compare Angular and React Want to compare Angular and React',
      status: 'In Progress'
    },
    {
      srNo: 3,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 4,
      name: 'Mike Johnson',
      productName: 'Vue dfdfdffff Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 5,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 1,
      name: 'John Doe',
      productName: 'Angular Course',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      message: 'Want to compare Angular and React Interested in learning Angular Want to compare Angular and React',
      status: 'Pending'
    },
    {
      srNo: 2,
      name: 'Jane Smith',
      productName: 'React Course',
      email: 'jane@example.com',
      phoneNumber: '9876543210',
      message: 'Want to compare Angular and React Want to compare Angular and React Want to compare Angular and React',
      status: 'In Progress'
    },
    {
      srNo: 3,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 4,
      name: 'Mike Johnson',
      productName: 'Vue dfdfdffff Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 5,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 1,
      name: 'John Doe',
      productName: 'Angular Course',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      message: 'Want to compare Angular and React Interested in learning Angular Want to compare Angular and React',
      status: 'Pending'
    },
    {
      srNo: 2,
      name: 'Jane Smith',
      productName: 'React Course',
      email: 'jane@example.com',
      phoneNumber: '9876543210',
      message: 'Want to compare Angular and React Want to compare Angular and React Want to compare Angular and React',
      status: 'In Progress'
    },
    {
      srNo: 3,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 4,
      name: 'Mike Johnson',
      productName: 'Vue dfdfdffff Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 5,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 1,
      name: 'John Doe',
      productName: 'Angular Course',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      message: 'Want to compare Angular and React Interested in learning Angular Want to compare Angular and React',
      status: 'Pending'
    },
    {
      srNo: 2,
      name: 'Jane Smith',
      productName: 'React Course',
      email: 'jane@example.com',
      phoneNumber: '9876543210',
      message: 'Want to compare Angular and React Want to compare Angular and React Want to compare Angular and React',
      status: 'In Progress'
    },
    {
      srNo: 3,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 4,
      name: 'Mike Johnson',
      productName: 'Vue dfdfdffff Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 5,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 1,
      name: 'John Doe',
      productName: 'Angular Course',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      message: 'Want to compare Angular and React Interested in learning Angular Want to compare Angular and React',
      status: 'Pending'
    },
    {
      srNo: 2,
      name: 'Jane Smith',
      productName: 'React Course',
      email: 'jane@example.com',
      phoneNumber: '9876543210',
      message: 'Want to compare Angular and React Want to compare Angular and React Want to compare Angular and React',
      status: 'In Progress'
    },
    {
      srNo: 3,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 4,
      name: 'Mike Johnson',
      productName: 'Vue dfdfdffff Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    },
    {
      srNo: 5,
      name: 'Mike Johnson',
      productName: 'Vue Course',
      email: 'mike@example.com',
      phoneNumber: '5551234567',
      message: 'Want to compare Angular and React Looking for Vue.js training Want to compare Angular and React',
      status: 'Resolved'
    }
  ];

   searchText: string = '';
  statusFilter: string = '';
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pageSizeOptions = [10, 50, 100, 200, -1]; // -1 represents "All"
  showEndOption: boolean = false;

  statusOptions: ('Pending' | 'In Progress' | 'Resolved')[] = [
    'Pending', 
    'In Progress', 
    'Resolved'
  ];

  get filteredEnquiries(): Enquiry[] {
    const searchLower = this.searchText.toLowerCase();
    return this.enquiries.filter(enquiry => {
      // Check status filter first (exact match)
      const statusMatch = this.statusFilter ? 
        enquiry.status === this.statusFilter : true;
      
      // If search text is empty, only apply status filter
      if (!this.searchText) return statusMatch;
      
      // Check all fields for search text (case-insensitive)
      return (
        enquiry.name.toLowerCase().includes(searchLower) ||
        enquiry.email.toLowerCase().includes(searchLower) ||
        enquiry.phoneNumber.includes(this.searchText) ||
        enquiry.productName.toLowerCase().includes(searchLower) ||
        enquiry.status.toLowerCase().includes(searchLower)
      ) && statusMatch;
    });
  }



  get paginatedEnquiries(): Enquiry[] {
    if (this.itemsPerPage === -1) {
      return this.filteredEnquiries;
    }
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEnquiries.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    if (this.itemsPerPage === -1) return 1;
    return Math.ceil(this.filteredEnquiries.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1; // Reset to first page when changing page size
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  goToEnd(): void {
    this.currentPage = this.totalPages;
  }
  updateStatus(enquiry: Enquiry, newStatus: 'Pending' | 'In Progress' | 'Resolved') {
    enquiry.status = newStatus;
    console.log(`Status updated for ${enquiry.name}: ${newStatus}`);
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
}