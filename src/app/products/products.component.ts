import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var Razorpay: any;
@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  product: any;

  constructor(private route: ActivatedRoute) {
    const navigation = window.history.state;
    this.product = navigation.product;
    console.log("PRODUCT DATA>>>>>>>>>>",this.product)
  }

 


  ngOnInit() {
    this.loadRazorpayScript();
  }

  loadRazorpayScript() {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => console.log("Razorpay script loaded");
    document.body.appendChild(script);
  }

  payWithRazorpay() {
    if (typeof Razorpay === 'undefined') {
      alert('Razorpay SDK not loaded. Check your internet connection.');
      return;
    }

    const options = {
      "key": "rzp_test_W7NkcgtEncLHaE", // Replace with your actual key
      "amount": 50000, // Amount in paisa (₹500.00)
      "currency": "INR",
      "name": "OpasBizz Pvt Ltd",
      "description": "Test Transaction",
      "image": "/opasLogo.png",
      "handler": function(response: any) {
        console.log('Payment Successful:', response);
        alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
      },
      "prefill": {
        "name": "Shivendra Singh",
        "email": "Admin@opasbizz.com",
        "contact": "8009727256"
      },
      "theme": {
        "color": "hsl(219.29deg 65.6% 29.28%)"
      }
    };

    const rzp1 = new Razorpay(options);
    console.log("RAZOR PAY >>>>>>",rzp1)
    rzp1.open();
  }

}
