import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QuoteService } from 'src/app/services/quote.service';
import { EmptyQuoteRow, Quote, EmptyQuote, QuoteRow } from 'src/app/models/quote';
import { Observable, of, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';

import { ModalService } from 'src/app/services/modal.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { DeleteService } from 'src/app/services/delete.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {
  quote$: Observable<any>;
  quote: Quote;
  quoteUid: string;
  quoteRows$: Observable<any>;
  products$: Observable<any>;
  searchText: string;
  productName: string;
  autocompleteOn: Array<boolean>;
  route$: Subscription;
  deleteStatus$: Observable<any>;

  @ViewChild('DeleteConfirmDialogComponent') modal: ElementRef;

  constructor(
    private quoteService: QuoteService,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private deleteService: DeleteService) {

  }

  ngOnInit() {
    this.quoteUid = this.route.snapshot.paramMap.get('uid');
    this.quote$ = this.quoteService.getQuote(this.quoteUid);
    this.quote$.subscribe(quote => this.quote = quote);
    this.quoteRows$ = this.quoteService.getQuoteRows(this.quoteUid);
    this.quoteRows$.subscribe(rows => this.autocompleteOn = Array(rows.length).fill(false));
    this.deleteStatus$ = this.deleteService.deleteObs$;
  }


  searchProducts(event) {
    const value = event.target.value;
    this.products$ = this.productService.searchProducts(value);
  }

  addNewRowInTable() {
    this.quoteService.addQuoteRow(EmptyQuoteRow, this.quote.uid);
  }

  createNewQuote() {
    this.quoteService.addQuote(EmptyQuote);
  }


  chooseProduct(product: Product, quoteRow: QuoteRow, i: number) {
    this.productName = product.name;
    quoteRow.product = product;
    this.searchText = '';
    this.quoteService.updateProductNameInQuoteRow(quoteRow);
    this.products$ = of(null);
    this.autocompleteOn[i] = false;
  }

  removeQuoteRow(uid: string) {
    this.modalService.init(DeleteModalComponent);
    this.deleteStatus$.subscribe(status => {
      if (status) {
        this.quoteService.removeQuoteRow(uid);
      }
    });
  }

  updateRow(event, value: string, quoteRow: QuoteRow) {
    const val: number = +event.target.textContent;
    switch (value) {
      case 'quantity':
        quoteRow.quantity = +val;
        quoteRow.mc_total_netto = +(quoteRow.product.mc_netto * val).toFixed(2);
        quoteRow.pc_total_netto = +(quoteRow.product.pc_netto * val).toFixed(2);
        quoteRow.pc_total_brutto = +(quoteRow.product.pc_brutto * val).toFixed(2);
        quoteRow.income_total_bruto = +(quoteRow.income_brutto * val).toFixed(2);
        quoteRow.income_total_netto = +(quoteRow.income_netto * val).toFixed(2);
        // tslint:disable-next-line:max-line-length
        quoteRow.vat = +((quoteRow.income_total_bruto - quoteRow.income_total_netto) - (quoteRow.pc_total_brutto - quoteRow.pc_total_netto)).toFixed(2);
        quoteRow.podatek = +((quoteRow.income_total_netto - quoteRow.pc_total_netto) * 0.19).toFixed(2);
        quoteRow.income = +(quoteRow.income_total_netto - quoteRow.mc_total_netto - quoteRow.podatek - quoteRow.vat).toFixed(2);
        break;
      case 'income_brutto':
        quoteRow.income_brutto = +val.toFixed(2);
        quoteRow.income_total_bruto = +(+val * quoteRow.quantity).toFixed(2);
        quoteRow.income_netto = +(+val / (1 + quoteRow.product.pc_vat / 100)).toFixed(2);
        quoteRow.income_total_netto = +(quoteRow.income_netto * quoteRow.quantity).toFixed(2);
        // tslint:disable-next-line:max-line-length
        quoteRow.vat = +((quoteRow.income_total_bruto - quoteRow.income_total_netto) - (quoteRow.pc_total_brutto - quoteRow.pc_total_netto)).toFixed(2);
        quoteRow.podatek = +((quoteRow.income_total_netto - quoteRow.mc_total_netto) * 0.19).toFixed(2);
        quoteRow.income = +(quoteRow.income_total_netto - quoteRow.mc_total_netto - quoteRow.podatek - quoteRow.vat).toFixed(2);
        break;
      case 'income_netto':
        quoteRow.income_netto = +val.toFixed(2);
        quoteRow.income_brutto = +(+val * (1 + quoteRow.product.pc_vat / 100)).toFixed(2);
        quoteRow.income_total_bruto = +(+quoteRow.income_brutto * quoteRow.quantity).toFixed(2);
        quoteRow.income_total_netto = +(quoteRow.income_netto * quoteRow.quantity).toFixed(2);
        // tslint:disable-next-line:max-line-length
        quoteRow.vat = +((quoteRow.income_total_bruto - quoteRow.income_total_netto) - (quoteRow.pc_total_brutto - quoteRow.pc_total_netto)).toFixed(2);
        quoteRow.podatek = +((quoteRow.income_total_netto - quoteRow.mc_total_netto) * 0.19).toFixed(2);
        quoteRow.income = +(quoteRow.income_total_netto - quoteRow.mc_total_netto - quoteRow.podatek - quoteRow.vat).toFixed(2);
    }
    this.quoteService.updateQuoteRow(quoteRow);
    // this.quoteService.updateQuote(this.quote);
  }

  setAutocomplete(index: number) {
    this.autocompleteOn[index] = !this.autocompleteOn[index];
  }

}
