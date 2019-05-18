import { Product, EmptyProduct } from './product';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Customer, EmptyCustomer } from './customer';

export interface QuoteRow {
    product: Product;
    quantity: number;
    mc_total_netto: number;
    pc_total_netto: number;
    pc_total_brutto: number;
    income_netto: number;
    income_vat: number;
    income_brutto: number;
    income_total_netto: number;
    income_total_bruto: number;
    vat: number;
    podatek: number;
    income: number;
    date: firebase.firestore.FieldValue;
    uid?: string;
    quote_uid?: string;
}

const EmptyContactData = {
    comments: '',
    lastPhoneContactDate: firebase.firestore.FieldValue.serverTimestamp(),
    lastMailContactDate: firebase.firestore.FieldValue.serverTimestamp(),
    nextContactDate: firebase.firestore.FieldValue.serverTimestamp(),
};

interface ContactData {
    comments: string;
    lastPhoneContactDate: firebase.firestore.FieldValue;
    lastMailContactDate: firebase.firestore.FieldValue;
    nextContactDate: firebase.firestore.FieldValue;
}


export interface Quote {
    name: string;
    name_search: string;
    quoteRows: Array<string>;
    date: firebase.firestore.FieldValue;
    uid?: string;
    mc_total_netto: number;
    pc_netto: number;
    pc_brutto: number;
    pc_total_netto: number;
    pc_total_brutto: number;
    income_netto: number;
    income_brutto: number;
    income_total_netto: number;
    income_total_brutto: number;
    vat: number;
    podatek: number;
    income: number;
    rabat: number;
    marza: number;
    rabatValue?: number;
    customer: Customer;
    contactData?: ContactData;
}


export const EmptyQuote = {
    name: '',
    name_search: '',
    quoteRows: [],
    date: firebase.firestore.FieldValue.serverTimestamp(),
    uid: '',
    mc_total_netto: 0,
    pc_brutto: 0,
    pc_netto: 0,
    pc_total_netto: 0,
    pc_total_brutto: 0,
    income_netto: 0,
    income_brutto: 0,
    income_total_netto: 0,
    income_total_brutto: 0,
    vat: 0,
    podatek: 0,
    income: 0,
    rabat: 0,
    marza: 0,
    rabatValue: 0,
    customer: EmptyCustomer,
    contactData: EmptyContactData
};

export const EmptyQuoteRow = {
    product: EmptyProduct,
    quantity: 0,
    mc_total_netto: 0,
    pc_total_netto: 0,
    pc_total_brutto: 0,
    income_netto: 0,
    income_vat: 0,
    income_brutto: 0,
    income_total_netto: 0,
    income_total_bruto: 0,
    vat: 0,
    podatek: 0,
    income: 0,
    date: firebase.firestore.FieldValue.serverTimestamp(),
    uid: '',
    quote_uid: ''
};
