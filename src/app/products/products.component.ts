import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 
  public products! : Array<Product>;  

  public index! : number;

  errorMessage! : string;

  constructor(private _productService : ProductService) { }

  ngOnInit(): void {
    //   this._productService.getAllProducts().subscribe({

    //   // 1- Première étapes si tout ce passe bien et que les données arrivent
    //   next: (data =>{
    //     this.products=data;
    //   }) ,
       
    //   //Dans le cas echéant
    //   error :(errors=>{
    //        this.errorMessage = errors;
    //   })


    // });

    this.handleGetAllProduct();

  }

 
  // getAllProduct

  handleGetAllProduct(){
 
    this._productService.getAllProducts().subscribe({

          next: (data =>{
                          this.products=data;
                         }) ,error :( errors=> {                            
                              
                          this.errorMessage = errors;})
                                                                            
      });
  };


  //Delete 

  handleDeleteProducts(item: Product){
    
   let conf=confirm("Are you sure?")
   if(conf==false) return;

    this._productService.deleteProduct(item.id).subscribe({
      next: (data=>{

         //this.handleGetAllProduct();

       this.index = this.products.indexOf(item);

        this.products.splice(this.index,1);
      })
    })
    
    
   // this.index = this.products.indexOf(item);

    //this.products.splice(this.index,1);

  }

}
