import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Quote, QuoteRow, EmptyQuote } from '../models/quote';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private afs: AngularFirestore) { }

  getAllQuotes(): Observable<any> {
    return this.afs.collection('quotes', ref => ref.orderBy('date')).valueChanges();
  }

  getQuote(uid: string): Observable<any> {
    return this.afs.doc(`quotes/${uid}`).valueChanges();
  }

  searchQuotes(searchValue: string) {
    return this.afs.collection(`quotes`, ref => ref
      .orderBy('name_search')
      .startAt(searchValue.toLowerCase())
      .endAt(searchValue.toLowerCase() + '\uf8ff'))
      .valueChanges();
  }

  searchQuoteRows(searchValue: string) {
    // return this.afs.collection(`products`, ref => ref
    //   .orderBy('name_search')
    //   .startAt(searchValue.toLowerCase())
    //   .endAt(searchValue.toLowerCase() + '\uf8ff'))
    //   .valueChanges();
  }

  async addQuote(quote: Quote) {
    try {
      quote.uid = this.afs.createId();
      localStorage.setItem('quote_uid', quote.uid);
      await this.afs.collection('quotes').doc(quote.uid).set(quote);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async updateQuote(quote: Quote) {
    try {
      quote.name_search = quote.name.toLowerCase().trim();
      console.log('quote:', quote);
      await this.afs.collection('quotes').doc(quote.uid).update(quote);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  getQuoteRows(quoteUid: string) {
    return this.afs.collection<QuoteRow>('quotesrows', ref =>
      ref.where('quote_uid', '==', quoteUid).orderBy('date')).valueChanges();
  }

  async removeQuote(quote: Quote) {
    try {
      await this.afs.collection('quotes').doc(quote.uid).delete();
      // await this.updateQuoteComplete(quote.uid);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async addQuoteRow(quoteRow: QuoteRow, quoteUid) {
    try {
      quoteRow.uid = this.afs.createId();
      quoteRow.quote_uid = quoteUid;
      await this.afs.collection('quotesrows').doc(quoteRow.uid).set(quoteRow);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async updateProductNameInQuoteRow(quoteRow: QuoteRow) {
    try {
      await this.afs.collection('quotesrows').doc(quoteRow.uid).update(quoteRow);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async updateCustomerInQuote(quote: Quote) {
    console.log('quote:', quote);
    try {
      await this.afs.collection('quotes').doc(quote.uid).update(quote);
      return true;
    } catch (e) {
      return false;
    }
  }



  async updateQuoteRow(quoteRow: QuoteRow) {
    try {
      await this.afs.collection('quotesrows').doc(quoteRow.uid).update(quoteRow);
      await this.updateQuoteComplete(quoteRow.quote_uid);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async updateQuoteComplete(uid: string) {
    const quote: Quote = EmptyQuote;
    quote.uid = uid;
    try {
      const quoteRows$ = await this.afs.collection('quotesrows', ref => ref.where('quote_uid', '==', uid)).valueChanges();
      quoteRows$.subscribe((rows: QuoteRow[]) => {
        quote.income_total_brutto = (this.sum(rows, 'income_total_bruto'));
        quote.income_total_netto = (this.sum(rows, 'income_total_netto'));
        quote.mc_total_netto = (this.sum(rows, 'mc_total_netto'));
        quote.pc_netto = (this.sumProductValues(rows, 'pc_netto'));
        quote.pc_brutto = (this.sumProductValues(rows, 'pc_brutto'));
        quote.income_netto = (this.sum(rows, 'income_netto'));
        quote.income_brutto = (this.sum(rows, 'income_brutto'));
        quote.pc_total_brutto = (this.sum(rows, 'pc_total_brutto'));
        quote.pc_total_netto = (this.sum(rows, 'pc_total_netto'));
        quote.podatek = (this.sum(rows, 'podatek'));
        quote.vat = (this.sum(rows, 'vat'));
        quote.income = (this.sum(rows, 'income'));
        quote.rabat = this.roundToTwo(((100 - (quote.mc_total_netto * 100 / quote.income_total_netto)) / 100));
        quote.marza = this.roundToTwo((100 - (quote.pc_total_netto * 100 / quote.mc_total_netto)) / 100);

        this.updateQuote(quote);
      });
    } catch (e) {
      console.error(e);
    }
  }

  sum(arr, key: string): number {
    return +this.roundToTwo(arr.reduce((a, b) =>
      +a + (+b[key] || 0), 0));
  }

  sumProductValues(arr, key: string) {
    return this.roundToTwo(arr.reduce((a, b) => +a + +b.product[key], 0));
  }

  roundToTwo(value) {
    return Number(Math.round(+(value + 'e' + 2)) + 'e-' + 2);
  }



  async removeQuoteRow(uid: string) {
    try {
      await this.afs.collection('quotesrows').doc(uid).delete();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
