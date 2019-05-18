import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { QuoteComponent } from './components/quote/quote.component';
import { QuoteListComponent } from './components/quote-list/quote-list.component';
import { ShortQuoteComponent } from './components/short-quote/short-quote.component';
import { CustomerComponent } from './components/customer/customer.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [{
  path: '', component: QuoteListComponent
},
{ path: 'products', component: ProductsComponent },
{ path: 'quote/:uid', component: QuoteComponent },
{ path: 'quoteShort/:uid', component: ShortQuoteComponent },
{ path: 'quoteList', component: QuoteListComponent },
{ path: 'login', component: LoginComponent },
{ path: 'customer', component: CustomerComponent },
{ path: 'contact', component: ContactComponent },
{ path: 'supplier', component: SupplierComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
