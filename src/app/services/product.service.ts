import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products! : Array<Product>
  constructor() { 
    this.products=[
      //creation des Objet en Dur (objet static)
         {
           id: 1, name: 'computer', price: 1000
         },
   
         {
           id: 2, name: 'printer', price: 1200
         },
   
         {
          id: 3, name: 'Smart phone', price: 1400
         }
       ];
  }


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

 public deleteProduct(id: number) : Observable<boolean>{
 
  //une seconde façons de supprimer un item en utilisant la methodes js filter
  //on filtre notre ancien tableau en selection les produits dont p.id != id puis on ecran(affection) l'ancien tab
  this.products =this.products.filter(p=>p.id!=id);
  
  return of(true);
 }

}
