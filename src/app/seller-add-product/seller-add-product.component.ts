import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  constructor(private product: ProductService) {}

  // productForm = new FormGroup({
  //   'name': new FormControl('',Validators.required),
  //   'price': new FormControl('',Validators.required),
  //   'category': new FormControl('',Validators.required),
  //   'color': new FormControl('',Validators.required),
  //   'imageUrl': new FormControl('',Validators.required),

  // })
  name:string='';
  price:string='';
  category:string='';
  color:string='';
  imageUrl:string='';
  ngOnInit(): void {}

  submit(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMessage = 'Product is added successfully';
      }
    });

    setTimeout(() => {
      this.addProductMessage=undefined
    }, 3000);
  }
}
