import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products! : Array<any>
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
  
 getAllProducts() : Observable<Array<any>> {
  
  //nous allons simuler un cas d'error pour voir l'affichage

  let rdn =Math.random();

  if(rdn>0.5) return throwError("Internet Connextion error");

  else return of(this.products);
  
 }
}
