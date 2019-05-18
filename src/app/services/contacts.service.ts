import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { QuoteService } from './quote.service';
import { CustomersService } from './customers.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private afs: AngularFirestore, private quote: QuoteService, private customer: CustomersService) { }



}
