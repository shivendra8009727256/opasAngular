import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
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
  http=inject(HttpClient);
  products:any;
 

  constructor(private route: ActivatedRoute) {
    const navigation = window.history.state;
    this.product = navigation.product;
    console.log("PRODUCT DATA>>>>>>>>>>",this.product)
     this.getProductDetails()

  }

  getProductDetails(){
    const id=this.product._id
    this.http.get("http://localhost:8000/opas/getOneProduct/"+id).subscribe((res:any)=>{
      this.products=res?.data;
      console.log('Products Data successfully',res.data);
    })
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
  

}
