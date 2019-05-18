import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuoteComponent } from './components/quote/quote.component';

import { QuoteListComponent } from './components/quote-list/quote-list.component';
import { ShortQuoteComponent } from './components/short-quote/short-quote.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { AutocompleteModule } from './components/autocomplete/autocomplete.module';
import { FilterPipe } from './components/autocomplete/filter.pipe';
import { AutocompleteComponent } from './components/autocomplete/app-autocomplete.component';
import { CustomerComponent } from './components/customer/customer.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { ModalService } from './services/modal.service';
import { DomService } from './services/dom.service';
import { SupplierComponent } from './components/supplier/supplier.component';
import { ContactComponent } from './components/contact/contact.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { SearchTableComponent } from './components/search-table/search-table.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    LoginComponent,
    QuoteComponent,
    QuoteListComponent,
    ShortQuoteComponent,
    FilterPipe,
    CustomerComponent,
    DeleteModalComponent,
    SupplierComponent,
    ContactComponent,
    InputSearchComponent,
    SearchTableComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'blekitnaStrefas'),
    MDBBootstrapModule.forRoot(),
    OverlayModule,
    AutocompleteModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [AngularFirestore, ModalService, DomService],
  bootstrap: [AppComponent],
  entryComponents: [AutocompleteComponent, DeleteModalComponent]
})
export class AppModule { }
