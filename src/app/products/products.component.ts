import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
declare var Razorpay: any;
@Component({
  selector: 'app-products',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent  {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  product: any;
  http=inject(HttpClient);
  products:any;
  getAllList :any
 

  constructor(private route: ActivatedRoute) {
    const navigation = window.history.state;
    this.product = navigation.product;
    console.log("PRODUCT DATA>>>>>>>>>>",this.product)
     this.getProductDetails()
     this.getAllProductsList()
  }

 async getAllProductsList(){
 await this.http.get("http://localhost:8000/opas/getImage").subscribe((res:any)=>{
    this.getAllList = res.data; // Store the fetched images
    console.log('Images fetched successfully', this.getAllList);
  })

 }




  async getProductDetails(){
    const id=this.product._id
   await this.http.get("http://localhost:8000/opas/getOneProduct/"+id).subscribe((res:any)=>{
      this.products=res?.data;
      console.log( 'ROUTER Products Data successfully',res.data);
    })
  }
  async getProductOne(item:any){
    const id=item
   await this.http.get("http://localhost:8000/opas/getOneProduct/"+id).subscribe((res:any)=>{
      this.products=res?.data;
      console.log('ONE Products Data successfully',res.data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  }
 


  ngOnInit() {
    this.loadRazorpayScript();
     // Start auto-scrolling every 3 seconds
  this.scrollInterval = setInterval(() => {
    this.scrollRight();
  }, 4000); // Auto-scroll every 3 seconds
  }

  loadRazorpayScript() {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => console.log("Razorpay script loaded");
    document.body.appendChild(script);
  }

  

  async payWithRazorpay() {
    // const price= this.product.color
    // console.log("AMOUNT>>>>>>>>",price)

    this.http.post('http://localhost:8000/payment/create-order', { amount: 20, currency: 'INR' })
      .subscribe((order: any) => {
        console.log("ORDER RESPONSE >>>>", order);
  
        const options = {
          key: "rzp_test_W7NkcgtEncLHaE",
          amount: order.amount,
          currency: order.currency,
          name: "OpasBizz Pvt Ltd",
          image:"/opasLogo.png",
          description: "Test Transaction",
          order_id: order.id, // Fix: Ensure order.id exists
          handler: (response: any) => {
            console.log("PAYMENT RESPONSE >>>>", response);
            
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            };
  
            this.http.post('http://localhost:8000/payment/verify-payment', verifyPayload)
              .subscribe((res: any) => {
                console.log("VERIFY PAYMENT RESPONSE >>>>", res);
                if (res.success) {
                  alert("Payment verified successfully!");
                } else {
                  alert("Payment verification failed.");
                }
              });
          },
          prefill: {   // 👈 ADD THIS
            name: "Test User",
            email: "test@example.com",
            contact: "9999999999"
          },
          theme: { color: "hsl(219.29deg 65.6% 29.28%)" }
        };
  
        const rzp = new Razorpay(options);
        rzp.open();
      }, error => {
        console.error("Error creating order:", error);
      });
  }
  
/////////////////////////////////////////////////////////////////////////


// Variable to hold auto-scroll interval
private scrollInterval: any;



ngOnDestroy() {
  // Clear interval when component is destroyed to avoid memory leaks
  if (this.scrollInterval) {
    clearInterval(this.scrollInterval);
  }
}

scrollLeft() {
  const container = this.scrollContainer.nativeElement;
  const scrollPosition = container.scrollLeft;
  const itemWidth = container.children[0].offsetWidth;

  if (scrollPosition === 0) {
    // If we're at the start, scroll to the last item
    container.scrollLeft = container.scrollWidth - itemWidth;
  } else {
    container.scrollBy({ left: -itemWidth, behavior: 'smooth' });
  }
}

scrollRight() {
  const container = this.scrollContainer.nativeElement;
  const scrollPosition = container.scrollLeft;
  const itemWidth = container.children[0].offsetWidth;

  if (scrollPosition + container.offsetWidth >= container.scrollWidth) {
    // If we're at the end, scroll to the start
    container.scrollLeft = 0;
  } else {
    container.scrollBy({ left: itemWidth, behavior: 'smooth' });
  }
}








}
