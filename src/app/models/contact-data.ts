import { Customer } from './customer';
import { Quote } from '@angular/compiler';

export interface ContactData {
    customer: Customer;
    quote: Quote;
    comments: string;
    lastPhoneContactDate: firebase.firestore.FieldValue;
    lastMailContactDate: firebase.firestore.FieldValue;
    nextContactDate: firebase.firestore.FieldValue;
}
