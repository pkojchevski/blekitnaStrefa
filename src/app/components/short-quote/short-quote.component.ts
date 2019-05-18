import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { Quote } from '@angular/compiler';
import { FormControl } from '@angular/forms';
import { QuoteService } from 'src/app/services/quote.service';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { EmptyQuoteRow, EmptyQuote, QuoteRow } from 'src/app/models/quote';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-short-quote',
  templateUrl: './short-quote.component.html',
  styleUrls: ['./short-quote.component.scss']
})
export class ShortQuoteComponent implements OnInit {
  quote$: Observable<any>;
  quote: Quote;
  quoteUid: string;
  quoteRows$: Observable<any>;
  products$: Observable<any>;
  searchText: string;
  productName: string;
  autocompleteOn: Array<boolean>;
  route$: Subscription;
  lastKeyPressed: number;

  control = new FormControl();

  constructor(private quoteService: QuoteService,
    private productService: ProductsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.quoteUid = this.route.snapshot.paramMap.get('uid');
    this.quote$ = this.quoteService.getQuote(this.quoteUid);
    this.quote$.subscribe(quote => this.quote = quote);
    this.quoteRows$ = this.quoteService.getQuoteRows(this.quoteUid);
    // this.quoteRows$.subscribe(rows => this.autocompleteOn = Array(rows.length).fill(false));
  }


  onkeyup(event) {
    if (event.timeStamp - this.lastKeyPressed > 200) {
    }
    this.lastKeyPressed = event.timeStamp;
  }

  searchProducts(event) {
    const value = event.target.value;
    if (event.timeStamp - this.lastKeyPressed) {
    }
    this.lastKeyPressed = event.timeStamp;
  }

  addNewRowInTable() {
    // this.quoteService.addQuoteRow(EmptyQuoteRow, this.quote.uid);
  }

  createNewQuote() {
    // this.quoteService.addQuote(EmptyQuote);
  }


  // chooseProduct(product: Product, quoteRow: QuoteRow, i: number) {
  //   this.productName = product.name;
  //   quoteRow.product = product;
  //   this.searchText = '';
  //   this.quoteService.updateProductNameInQuoteRow(quoteRow);
  //   this.products$ = of(null);
  //   this.autocompleteOn[i] = false;
  // }

  // removeQuoteRow(uid: string) {
  //   this.quoteService.removeQuoteRow(uid);
  // }

  // updateRow(event, value: string, quoteRow: QuoteRow) {
  //   const val: number = +event.target.textContent;
  //   switch (value) {
  //     case 'quantity':
  //       quoteRow.quantity = +val;
  //       quoteRow.mc_total_netto = Math.round(quoteRow.product.mc_netto * val);
  //       quoteRow.pc_total_netto = Math.round(quoteRow.product.pc_netto * val);
  //       quoteRow.pc_total_brutto = Math.round(quoteRow.product.pc_brutto * val);
  //       quoteRow.income_total_bruto = Math.round(quoteRow.income_brutto * val);
  //       quoteRow.income_total_netto = Math.round(quoteRow.income_netto * val);
  //       // tslint:disable-next-line:max-line-length
  //       quoteRow.vat = Math.round((quoteRow.income_total_bruto - quoteRow.income_total_netto) - (quoteRow.pc_total_brutto - quoteRow.pc_total_netto));
  //       quoteRow.podatek = Math.round((quoteRow.income_total_netto - quoteRow.mc_total_netto) * 0.19);
  //       quoteRow.income = Math.round(quoteRow.income_total_netto - quoteRow.mc_total_netto - quoteRow.podatek - quoteRow.vat);
  //       break;
  //     case 'income_brutto':
  //       quoteRow.income_brutto = +val;
  //       quoteRow.income_total_bruto = Math.round(+val * quoteRow.quantity);
  //       quoteRow.income_netto = Math.round(+val / (1 + quoteRow.product.pc_vat / 100));
  //       quoteRow.income_total_netto = Math.round(quoteRow.income_netto * quoteRow.quantity);
  //       // tslint:disable-next-line:max-line-length
  //       quoteRow.vat = Math.round((quoteRow.income_total_bruto - quoteRow.income_total_netto) - (quoteRow.pc_total_brutto - quoteRow.pc_total_netto));
  //       quoteRow.podatek = Math.round((quoteRow.income_total_netto - quoteRow.mc_total_netto) * 0.19);
  //       quoteRow.income = Math.round(quoteRow.income_total_netto - quoteRow.mc_total_netto - quoteRow.podatek - quoteRow.vat);
  //   }
  //   this.quoteService.updateQuoteRow(quoteRow);
  //   // this.quoteService.updateQuote(this.quote);
  // }



}
