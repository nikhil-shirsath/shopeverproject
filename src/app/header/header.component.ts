import { Component, OnInit } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName:string="";
  userName:string="";
  searchResult:undefined|product[];
  cartItems=0;
  constructor(private route: Router, private product:ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        let sellerStore=localStorage.getItem('seller');
        if (sellerStore && val.url.includes('seller')) {
          
          // console.log(sellerStore);
         let sellerData =sellerStore && JSON.parse(sellerStore);
         console.log(sellerData);
         this.sellerName=sellerData.name;
      //   console.log(sellerData);
          this.menuType = 'seller';
        }
        else if(localStorage.getItem('user')){
          let userStore:any = localStorage.getItem('user');
          console.log(userStore);
          let userData =   JSON.parse(userStore);

          console.log(userStore);
          this.userName= userData.name;
          this.menuType='user';
          this.product.getCartList(userData.id);
        }
         else {
          this.menuType = 'default';
        }
      }
    });

    let cartData= localStorage.getItem('localCart');
    if(cartData){
      this.cartItems= JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems= items.length
    })
  }
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result)=>{
       
        if(result.length>5){
          result.length=length
        }
        this.searchResult=result;
      })
    }
  }
  hideSearch(){
    this.searchResult=undefined
  }
  redirectToDetails(id:number){
    this.route.navigate(['/details/'+id])
  }
  submitSearch(val:string){
    if(val){
      // console.warn(val)
      this.route.navigate([`search/${val}`]);
    }
   
  }
}
