import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 
  public products : any;  

  public index! : number;

  errorMessage! : string;

  constructor(private _productService : ProductService) { }

  ngOnInit(): void {
      this._productService.getAllProducts().subscribe({

      // 1- Première étapes si tout ce passe bien et que les données arrivent
      next: (data =>{
        this.products=data;
      }) ,
       
      //Dans le cas echéant
      error :(errors=>{
           this.errorMessage = errors;
      })


    });
  }

  //Delete 

  handleDeleteProducts(item: any){
    
    this.index = this.products.indexOf(item);

    this.products.splice(this.index,1);

  }

}
