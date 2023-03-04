import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  //etant données que nous ne pouvons pas instancier une route nous allons optez pour l'utilisation des singletons
    // c'est-a-dire {}
  {
    path: "products",
    component: ProductsComponent
  },
  {
    path: "customers",
    component: CustomersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
