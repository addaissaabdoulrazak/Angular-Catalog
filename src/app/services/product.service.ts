import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { Product, pageProduct } from '../model/product';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products! : Array<Product>
  constructor() { 
    this.products=[
      //creation des Objet en Dur (objet static)
      
         {
           id: UUID.UUID(), name: 'computer', price: 1000, promotion:true
         },
   
         {
           id: UUID.UUID(), name: 'printer', price: 1200, promotion:false
         },
   
         {
          id: UUID.UUID(), name: 'Smart phone', price: 1400,promotion:true
         }

       ];
       for(let i=0; i<10; i++)
       {
         this.products.push(
           
           {
             id: UUID.UUID(), name: 'computer', price: 1000, promotion:true
           },

         );
         this.products.push(
    
          {
            id: UUID.UUID(), name: 'printer', price: 1200, promotion:false
          },

        );
        this.products.push(
           
       
          {
            id: UUID.UUID(), name: 'Smart phone', price: 1400,promotion:true
          }
        );
       }
  }

//======================================================[GetAll]====================================================
/**
 * Ceci est un test Afin de Simuler les bonnes pratiques
 * 
 * Et pour cela nous allons Optez pour l'utilisation des Observable
 * 
 * Afin de mettre en pratique la programation reactive
 */
  
 getAllProducts() : Observable<Array<Product>> {
  
  //nous allons simuler un cas d'error pour voir l'affichage

  let rdn =Math.random();

  if(rdn>0.5) return throwError("Internet Connextion error");

  else return of(this.products); 
 }


//=====================================================[Delete]====================================================

 /**
  * comment supprimer un element en se basant toujours sur l'utilisation  de la programmation reactive.
  * 
  * Le principe est très simple : le suppression ne doit être effectuer qu'au niveau du composant, 
  * 
  *  ! on ne supprimer pas au niveau du service .
  * 
  * c'est-a-dire pour supprimer il faut faire appelle au service, le service supprime au nivaeu du Back-end
  * 
  * et renvoi un boolean(en se basant sur les observable bien-sûr) et si le boolean est true alors nous pouvons 
  * 
  * supprimer dans le composant dans le component.
  * 
  * 
  */

 public deleteProduct(id: string) : Observable<boolean>{
 
  //une seconde façons de supprimer un item en utilisant la methodes js filter
  //on filtre notre ancien tableau en selection les produits dont p.id != id puis on ecran(affection) l'ancien tab
  this.products =this.products.filter(p=>p.id!=id);
  
  return of(true);
 }



 //------------------------------------------------[Gestion des promotions]-------------------------------------------

public setProduct(id: string): Observable<boolean> {
  
  //récuperation d'un seul produit en foncttion de son id (on peut recuperer tout comme nous pouvons ne pas le recuperer)
  let singleProduct = this.products.find(p=>p.id==id);

   if(singleProduct != undefined)
   {
    singleProduct.promotion= !singleProduct.promotion;
    return of(true);

   }else return throwError(() => new Error("Not found product"))
  


}

  searchProduct(keyWord: string): Observable<Product[]> {

    let products = this.products.filter(p=>p.name.includes(keyWord));

    return of(products);

}


//---------------------------------------[Pagination]---------------------------------------

getPageProducts(size: number, currentPage:number) : Observable<pageProduct> {
  
   let indexd = size * currentPage ;
   
   //tilde for entier division
   let totalPages = ~~ (this.products.length/size); 

   if(this.products.length%size !=0)  

   totalPages++;
  
   //1-nous allons appliquer une certain restriction sur le tableau global afin d'Obtenir. 
     //2- un nouveau élements/une partie du tableau global(PagesProducts).

   let actualPageProducts = this.products.slice(indexd, indexd+size);
    
   //1-nous devons retourner la pageProducts etant données que celle-ci est une Interface nous ne pouvons pas l'instancier
     //2-donc nous allons optez pour l'utilisation de la notion d'objet => {} .
  return of( 
     
     {
      totalPages:totalPages,

      currentPage:currentPage,
       
      size : size,

      products : actualPageProducts
     }

   ); 
 }

}
