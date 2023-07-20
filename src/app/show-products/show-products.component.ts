import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {
  showAllProducts: undefined| product[];
  constructor(private product:ProductService) { }

  ngOnInit(): void {

    this.product.showProducts().subscribe((data)=>{
      this.showAllProducts=data;
    })

  }

}
