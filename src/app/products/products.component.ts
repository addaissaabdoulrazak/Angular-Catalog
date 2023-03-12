import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  searchFormGroup! : FormGroup;

  //pagination 

  currentPage = 0;
  
  pageSize: number = 5 ;

  totalPages :number =0 ;

  //technique
   currentAction:string ="All";




  constructor(private _productService : ProductService, private fb : FormBuilder) { }

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

    

    this.searchFormGroup =this.fb.group(
      {
       
        // we have a key/value system (attribut/valeur ou propriété/value) because it's an Object =>  {}
        keyword: this.fb.control(null), 
      }

    )
      
    //this.handleGetAllProduct();
    this.handleGetPageProduct();
  }

 
  // --------------------------------------------------[getAllProduct]-----------------------------------------------------

  handleGetAllProduct(){
 
    this._productService.getAllProducts().subscribe(
      {

        next: (data=>{
          this.products=data;          // it's possible to write next(data){ this.products=data}
        }),

        error : (err=>{
          this.errorMessage = err;
        })

                                                                            
      }
      
    );
  };


  //-----------------------------------------------[Delete]-------------------------------------------------------

  handleDeleteProducts(item: Product):void{
    
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


  //------------------------------[Active/Desactive Promotion]--------------------------------------

  handleSetPromotion(product: Product){
     let promo = ! product.promotion;
    this._productService.setProduct(product.id).subscribe({
      next: (bool) =>{
         //console.log("Ok");
        product.promotion=promo;
      },
      error : boolFalse =>{
        this.errorMessage =boolFalse; 
      }
    })
  }

  //---------------------------------[Formulaire Management/ search produit]---------------------------------------------------------

  handleSearchProduct(){
         this.currentAction ="search"
   
     let keyWord =this.searchFormGroup.value.keyword;
     this._productService.searchProduct(keyWord,this.pageSize,this.currentPage).subscribe({
      next:(data)=>{
        this.products =data.products
        this.totalPages=data.totalPages
      }
     });
  }


  //---------------------------------------------[Get PageProduct/navigation management]----------------------------------------------

  handleGetPageProduct(){
 
    this._productService.getPageProducts(this.pageSize,this.currentPage).subscribe(
      {
       
        next: (data=>{
            this.products =data.products;  
            this.totalPages =data.totalPages;   
        }),

        error : (err=>{
          this.errorMessage = err;
        })

                                                                            
      }
      
    );
  };

  //---------------------------------------------[Go to the next pages]--------------------------------------------
  goToPages(i:number)
  {
    this.currentPage=0;
     this.currentPage = i;
     if(this.currentAction=="All")
     this.handleGetPageProduct();

     else this.handleSearchProduct();
  }

}
