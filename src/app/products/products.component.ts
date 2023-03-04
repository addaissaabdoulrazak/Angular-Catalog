import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 
  public products : any;  

  public index! : number;
  constructor() { }

  ngOnInit(): void {
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

  //Delete 

  handleDeleteProducts(item: any){
    
    this.index = this.products.indexOf(item);

    this.products.splice(this.index,1);

  }

}
