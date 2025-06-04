import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {CurrencyService} from '../../service/currency.service'
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { LoaderComponent } from '../loader/loader.component'; // Adjust path as needed
import { SecureStorageService } from '../services/secure-storage.service';



declare var Razorpay: any;
@Component({
  selector: 'app-products',
  imports: [CommonModule, MatCardModule, MatButtonModule,FormsModule, MatFormFieldModule, MatSelectModule,LoaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent  {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  isLoading = false; // Add loading state
  @ViewChild('formContainer') formContainer!: ElementRef;

  
  
    name: string = '';
    mobile: string = '';
    productName: string = '';
    email: string = '';
    message: string = '';
    isSent: boolean = false;
  product: any;
  http=inject(HttpClient);
  router = inject(Router);
  products:any;
  getAllList :any
  dollarToINR: any;
  /////////////////////
  exchangeRates: any = {}; // Store exchange rates
  selectedCurrency: string = 'USD'; // Default currency
  convertedPrice: number = 0;
  showDropdown: boolean = false; // Toggle dropdown visibility
  currencyList: string[] = []; // List of currencies
  quantity: number = 0; // User-entered quantity (in Tons)
  totalAmount: number = 0; // Store only numbers
  quantityCheck:boolean=true
  // Currency Flags (ISO 3166-1 alpha-2 country codes)
  currencyFlags: any ={
    INR: "in",
      USD: "us",
      AED: "ae",
      AFN: "af",
      ALL: "al",
      AMD: "am",
      ANG: "aw",
      AOA: "ao",
      ARS: "ar",
      AUD: "au",
      AWG: "aw",
      AZN: "az",
      BAM: "ba",
      BBD: "bb",
      BDT: "bd",
      BGN: "bg",
      BHD: "bh",
      BIF: "bi",
      BMD: "bm",
      BND: "bn",
      BOB: "bo",
      BRL: "br",
      BSD: "bs",
      BTN: "bt",
      BWP: "bw",
      BYN: "by",
      BZD: "bz",
      CAD: "ca",
      CDF: "cd",
      CHF: "ch",
      CLP: "cl",
      CNY: "cn",
      COP: "co",
      CRC: "cr",
      CUP: "cu",
      CVE: "cv",
      CZK: "cz",
      DJF: "dj",
      DKK: "dk",
      DOP: "do",
      DZD: "dz",
      EGP: "eg",
      ERN: "er",
      ETB: "et",
      EUR: "eu",
      FJD: "fj",
      FKP: "fk",
      FOK: "fo",
      GBP: "gb",
      GEL: "ge",
      GGP: "gg",
      GHS: "gh",
      GIP: "gi",
      GMD: "gm",
      GNF: "gn",
      GTQ: "gt",
      GYD: "gy",
      HKD: "hk",
      HNL: "hn",
      HRK: "hr",
      HTG: "ht",
      HUF: "hu",
      IDR: "id",
      ILS: "il",
      IMP: "im",
      
      IQD: "iq",
      IRR: "ir",
      ISK: "is",
      JEP: "je",
      JMD: "jm",
      JOD: "jo",
      JPY: "jp",
      KES: "ke",
      KGS: "kg",
      KHR: "kh",
      KID: "ki",
      KMF: "km",
      KRW: "kr",
      KWD: "kw",
      KYD: "ky",
      KZT: "kz",
      LAK: "la",
      LBP: "lb",
      LKR: "lk",
      LRD: "lr",
      LSL: "ls",
      LYD: "ly",
      MAD: "ma",
      MDL: "md",
      MGA: "mg",
      MKD: "mk",
      MMK: "mm",
      MNT: "mn",
      MOP: "mo",
      MRU: "mr",
      MUR: "mu",
      MVR: "mv",
      MWK: "mw",
      MXN: "mx",
      MYR: "my",
      MZN: "mz",
      NAD: "na",
      NGN: "ng",
      NIO: "ni",
      NOK: "no",
      NPR: "np",
      NZD: "nz",
      OMR: "om",
      PAB: "pa",
      PEN: "pe",
      PGK: "pg",
      PHP: "ph",
      PKR: "pk",
      PLN: "pl",
      PYG: "py",
      QAR: "qa",
      RON: "ro",
      RSD: "rs",
      RUB: "ru",
      RWF: "rw",
      SAR: "sa",
      SBD: "sb",
      SCR: "sc",
      SDG: "sd",
      SEK: "se",
      SGD: "sg",
      SHP: "sh",
      SLE: "sl",
      SLL: "sl",
      SOS: "so",
      SRD: "sr",
      SSP: "ss",
      STN: "st",
      SYP: "sy",
      SZL: "sz",
      THB: "th",
      TJS: "tj",
      TMT: "tm",
      TND: "tn",
      TOP: "to",
      TRY: "tr",
      TTD: "tt",
      TVD: "tv",
      TWD: "tw",
      TZS: "tz",
      UAH: "ua",
      UGX: "ug",
      UYU: "uy",
      UZS: "uz",
      VES: "ve",
      VND: "vn",
      VUV: "vu",
      WST: "ws",
      XAF: "cm",
      XCD: "vc",
      XDR: "xu",
      XOF: "sn",
      XPF: "pf",
      YER: "ye",
      ZAR: "za",
      ZMW: "zm",
      ZWL: "zw"
    
    
  }
  totalAmountInINR: number=0;
  userEmail: string | null;
  fullName: string | null;

  isActive: string | null;
  companyName: string | null;
  businessType: string | null;
  address: string | null;
  token: string | null;
  phoneNumber: string | null;
  userId: string | null;
  invoiceUrl: any | null;
  baseUrl: string = 'https://opasbizz.in/api'; // Base URL

  
  

  constructor(private secureStorage: SecureStorageService,private snackBar: MatSnackBar,private route: ActivatedRoute, private currencyService: CurrencyService,private cdr: ChangeDetectorRef) {
    // const navigation = window.history.state;
    // this.product = navigation.product;
    
    
     this.getAllProductsList()
     this.userEmail=this.secureStorage.getItem("email");
     this.isActive= this.secureStorage.getItem("isActive");
     this.fullName=this.secureStorage.getItem("fullName");
     this.businessType= this.secureStorage.getItem("businessType");
     this.companyName= this.secureStorage.getItem("companyName");
     this.address= this.secureStorage.getItem("address");
     this.token=this.secureStorage.getItem("token");
     this.phoneNumber=this.secureStorage.getItem("phoneNumber");
     this.userId=this.secureStorage.getItem("userId");





     
   
     console.log(this.userId,"PRODUCT DATA>>>>>>>>>>",this.userEmail, ">>>>>>>>")
  }

 async getAllProductsList(){
 await this.http.get("https://opasbizz.in/api/opas/getImage").subscribe((res:any)=>{
    this.getAllList = res.data; // Store the fetched images
    console.log('Images fetched successfully', this.getAllList);
  })

 }




  async getProductDetails(item:any){
    console.log("getProductDetails>>>>>>>>>>>>>>>>>>>>>",item)
    const id=item
   await this.http.get("http://localhost:8000/opas/getOneProduct/"+id).subscribe((res:any)=>{
      this.products=res?.data;
      this.convertedPrice = this.products.price; // Set default price
      this.quantity=0
      this.calculateTotalAmount()
      console.log( 'ROUTER Products Data successfully',res.data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  }
  // async getProductDetails(item:any){
  //   console.log("getProductDetails>>>>>>>>>>>>>>>>>>>>>")
  //   const id=item
  //  await this.http.get("https://opasbizz.in/api/opas/getOneProduct/"+id).subscribe((res:any)=>{
  //     this.products=res?.data;
  //     this.convertedPrice = this.products.price; // Set default price
  //     this.quantity=0
  //     this.calculateTotalAmount()
  //     console.log( 'ROUTER Products Data successfully',res.data);
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   })
  // }
  // async getProductOne(item:any){
  //   console.log("getProductOne>>>>>>>>>>>>>>>>>>>>>")
  //   const id=item
  //  await this.http.get("https://opasbizz.in/api/opas/getOneProduct/"+id).subscribe((res:any)=>{
  //     this.products=res?.data;
  //     console.log('ONE Products Data successfully',res.data);
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   })
  // }
 


  ngOnInit() {

    this.route.paramMap.subscribe(params => {
    const product = params.get('item'); // if your route is '/product/:item'
    this.product=product
    if (product) {
      console.log("Product ID from URL:", product);
      this.getProductDetails(product);  // fetch by ID
    } else {
      console.error("No product ID found in route params.");
    }
  });
    alert(this.product)
console.log(this.product,"THIS>PRODUCT ITEM >>>>>>>>>>>>>")

    this.currencyService.getExchangeRates().subscribe((data) => {
      this.exchangeRates = data.conversion_rates; // Store exchange rates
      this.currencyList = Object.keys(this.exchangeRates); // Get all available currencies
      console.log("Exchange Rates Loaded", this.exchangeRates);
    })
    this.loadRazorpayScript();
     // Start auto-scrolling every 3 seconds
  this.scrollInterval = setInterval(() => {
    this.scrollRight();
  }, 4000); // Auto-scroll every 3 seconds
  }


  /**
   * Toggle the currency dropdown visibility
   */
  toggleCurrencyDropdown() {
    this.showDropdown = !this.showDropdown;
    
  }

  /**
   * Handle currency selection change
   */
  onCurrencyChange(event: any) {
    this.selectedCurrency = event.value;
    console.log("SELECTED CURRENCY>>>>>>>>>>>>",this.selectedCurrency)
    this.convertPrice();
  }

  /**
   * Convert price to the selected currency
   */
  

 
  convertPrice() {
    if (this.exchangeRates[this.selectedCurrency]) {
      this.convertedPrice = this.products.price * this.exchangeRates[this.selectedCurrency];
    } else {
      this.convertedPrice = this.products.price; // Fallback to default price
    }
    this.calculateTotalAmount(); // Recalculate total when currency changes
  }
  async calculateTotalAmount() {
    
    
    
    const quantityInKg = this.quantity * 1000; // Convert Tons to Kilograms
    this.totalAmount =  Number((quantityInKg * this.convertedPrice).toFixed(2));; // Store only numbers
    // Convert totalAmount to INR if exchange rate exists
    if (this.exchangeRates['INR']) {
      this.totalAmountInINR = this.totalAmount * (this.exchangeRates['INR'] / this.exchangeRates[this.selectedCurrency]);
    } else {
      this.totalAmountInINR = this.totalAmount; // Default fallback
    }
  
  }
  

 
  


  loadRazorpayScript() {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => console.log("Razorpay script loaded");
    document.body.appendChild(script);
  }

  userDetails(){
    if(this.userEmail!=null && this.fullName!=null){
this.payWithRazorpay()
    }else{
      this.router.navigateByUrl("/register")
    }
  }

  async payWithRazorpay() {
    
    // const price= this.product.color
  //  this.isLoading = true; // Add loading state
    const obj={
      amount:this.totalAmount,
      currency:this.selectedCurrency
    }
    try{
      this.http.post('https://opasbizz.in/api/payment/create-order', obj)
      .subscribe(async (order: any) => {
        try{
          console.log("ORDER RESPONSE >>>>", order);
          const options = {
            key: "rzp_test_W7NkcgtEncLHaE",
            amount: order.amount,
            currency: order.currency,
            name: "OpasBizz Pvt Ltd",
            image:"/opasLogo.png",
            description: "Test Transaction",
            order_id: order.id, // Fix: Ensure order.id exists
            handler: async (response: any) => {
              console.log("PAYMENT RESPONSE >>>>", response);
              this.isLoading=true;
              const verifyPayload = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              };
    
             await this.http.post('https://opasbizz.in/api/payment/verify-payment', verifyPayload)
                .subscribe(async (res: any) => {
                  console.log("VERIFY PAYMENT RESPONSE >>>>", res);
                  if (res.success) {
                   await this.paymentSuccess(response,{order_id: order.id,amount: order.amount,currency: order.currency});
                  } else {
                   await this.paymentFailed({order_id: order.id,amount: order.amount,currency: order.currency,error:res.error});
                  }
                });
            },
            prefill: { 
              name: this.fullName || "Test User",
              email: this.userEmail || "test@example.com",
              contact: this.phoneNumber ||"0123456789"
            },
            theme: { color: "hsl(219.29deg 65.6% 29.28%)" }
          };
    
          const rzp = new Razorpay(options);
         await rzp.open();
        }catch(error){
          console.log("ERROR>>>>>>>> >>>>", error);
        }
        
  
       
      }, error => {
        console.error("Error creating order:>>>>>>>>>>>>>>>>", error);
        this.paymentFailed({error:error});
      });

    }catch(error){
      console.log("ERROR>>>>>>>>>>",error)

    }

    
  }




  /////////////////////////////sending Invoice In User Email ////////////////////////////
  sendInvoiceInEmail(item:any){
    this.isLoading=true;
    const obj={
      fullName:this.fullName,
      email:this.userEmail,
      invoiceURL:item
    }

    this.http.post("https://opasbizz.in/api/auth/mailSender", obj).subscribe(
      { next:async (res: any) => {
      console.log("AFTER SENDING MAIL>>>>>>>>",res)
      this.openSnackBar('Invoice sent to your email', 'Close');
      this.isLoading=false;
  }, error:(error)=>{
    console.log("ERROR FIND >>>>>>>>>",error)
  }
})

  } 
  
/////////////////////////////////////////////////////////////////////////
paymentSuccess(response: any,item:any) {
  // this.isLoading=true;
  console.log("RESPONCE PAYMENT SUCCESS>>>>>>>>>>",response)
  const obj={
    quantity:this.quantity,
      productId:this.products._id,
      userId:typeof this.userId === 'string' ? JSON.parse(this.userId) : this.userId,
      orderId:item.order_id,
      razorpayPaymentId:response.razorpay_payment_id,
      razorpayOrderId:response.razorpay_order_id,
      razorpaySignature:response.razorpay_signature,
      amount:item.amount,
      currency:item.currency,
      customerEmail:typeof this.userEmail === 'string' ? JSON.parse(this.userEmail) : this.userEmail,
      customerPhone:typeof this.phoneNumber === 'string' ? JSON.parse(this.phoneNumber) : this.phoneNumber,
    }
    console.log("OBJECT USER>>>>>>>>>>>",obj)
     
  this.http.post('https://opasbizz.in/api/payment/payment-success',obj).subscribe(async (res:any)=>{
  
    this.invoiceUrl=res?.invoiceUrl
   
    console.log(res,"Payment was successful!", this.invoiceUrl); 
    await this.sendInvoiceInEmail(this.invoiceUrl);
    this.quantity=0;
    this.calculateTotalAmount()
    

  })
  // this.isLoading = false; // Add loading state
  this.openSnackBar("Payment successful! Thank you for your purchase.", "OK");

  // Here you can redirect the user or perform any other action
}

paymentFailed(item:any) {
  const obj={
    userId:"1",
    orderId:item.orderId,
    amount:item.amount,
    currency:item.currency,
    status: "Failed",
    errorDetails:item.error,
  }
  this.http.post('https://opasbizz.in/api/payment/payment-failed',obj).subscribe((res:any)=>{
    console.log("Payment failed!");
    // this.isLoading = false; // Add loading state
  this.openSnackBar("Payment failed! Please try again.", "Retry"); 
  })
  console.log("Payment failed!");
  // this.isLoading = false; // Add loading state
  this.openSnackBar("Payment failed! Please try again.", "Retry");
  
}

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


 // Method to show the snackbar
 openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000, // Duration in milliseconds (2 seconds)
    verticalPosition: 'top', // Snackbar appears at the top
    horizontalPosition: 'center', // Snackbar appears at the center
  });
}


openPdfInNewWindow() {
  this.isLoading = true; // Add loading state
  const pdfUrl = this.baseUrl + this.invoiceUrl;
  console.log('Generated PDF URL:', pdfUrl); // Log to check if the URL is correct

  if (this.invoiceUrl) {
    this.isLoading = false; // Add loading state
    window.open(pdfUrl, '_blank');
  } else {
    this.isLoading = false; // Add loading state
    this.openSnackBar("Invoice not found. Please try again later.", "Retry");
    console.error('Invalid URL:', pdfUrl);
  }
}

// /////////////////////add send query /////////////////////
// ?/////////////////////email card ////////////////
isFormValid(): boolean {
  return this.name.trim() !== '' && this.email.trim() !== '' && this.email.includes('@');
}

sendLetter(): void {
  if (!this.isFormValid()) return;
  // this.isLoading = true; // Add loading state
  const obj = {
    fullName: this.name,
    email: this.email,
    productName: this.productName,
    phoneCode: "formValue.phoneCode",
    phoneNumber: this.mobile,
    message: this.message,
    status: "pending",
    userId: this.userId ||null
  };
  console.log(" send DATA OF ENQUIRY API>>>>>>>>>", obj);
  this.http.post("https://opasbizz.in/api/userInquiry/inquirySave", obj).subscribe({
    next: async (res: any) => {
      if (res) {
        this.isSent = true;
        console.log("IF USER IS LOG IN >>>>>>>>", res)
        // Reset form after animation completes
        setTimeout(() => {
          // this.isLoading = false; // Add loading state
          this.resetForm();
        }, 6000);
      }
    },
    error: (err) => {
      // this.openSnackBar("Error submitting form. Please try again.", "close");
      console.error("Submission error:", err);
    }
  });
  // this.isSent = true;

  // // Optional: You could send the data to a service here
  // console.log('Form submitted:', {
  //   name: this.name,
  //   mobile: this.mobile,
  //   email: this.email,
  //   message: this.message
  // });

  // Reset form after animation completes
  // setTimeout(() => {
  //   this.resetForm();
  // }, 6000);
}

private resetForm(): void {
  this.name = '';
  this.mobile = '';
  this.productName = '';
  this.email = '';
  this.message = '';
  this.isSent = false;
}

}
