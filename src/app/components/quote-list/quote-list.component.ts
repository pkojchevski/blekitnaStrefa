import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Quote, EmptyQuote } from 'src/app/models/quote';
import { QuoteService } from 'src/app/services/quote.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { DeleteService } from 'src/app/services/delete.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss']
})
export class QuoteListComponent implements OnInit {

  quoteList$: Observable<any>;
  lastKeyPressed: number;
  searchText: string;
  deleteStatus$: Observable<any>;
  autocompleteOn: Array<boolean>;
  customerName: string;
  customers$: Observable<any[]>;


  constructor(private quoteService: QuoteService,
    private router: Router,
    private modalService: ModalService,
    private deleteService: DeleteService,
    private customerService: CustomersService) { }

  ngOnInit() {
    this.quoteList$ = this.quoteService.getAllQuotes();
    this.deleteStatus$ = this.deleteService.deleteObs$;
    this.quoteList$.subscribe(quotes =>
      this.autocompleteOn = new Array(quotes.length).fill(false));
  }

  searchCustomers(event) {
    const value = event.target.value;
    this.customers$ = this.customerService.searchCustomers(value);
  }

  addNewRowInTable() {
    this.quoteService.addQuote(EmptyQuote);
  }

  addNameToQuote(event, quote) {
    quote.name = event.target.textContent;
    this.quoteService.updateQuote(quote);
  }

  openShortQuote(uid: string) {
    this.router.navigateByUrl('shortquote');
  }

  deleteQuote(quote: Quote) {
    this.modalService.init(DeleteModalComponent);
    this.deleteStatus$.subscribe(status => {
      if (status) {
        this.quoteService.removeQuote(quote);
      }
    });
  }

  copyQuote(quote) {
    quote.name = quote.name + '_copy';
    this.quoteService.addQuote(quote);
  }

  chooseCustomer(customer, quote, i) {
    this.autocompleteOn[i] = !this.autocompleteOn[i];
    quote.customer = customer;
    this.quoteService.updateCustomerInQuote(quote);
    this.customers$ = of(null);
  }

  setAutocomplete(i) {
    this.autocompleteOn[i] = !this.autocompleteOn[i];
  }
}
