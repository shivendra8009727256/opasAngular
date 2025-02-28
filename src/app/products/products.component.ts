import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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


}
