import * as firebase from 'firebase/app';
import 'firebase/firestore';

export interface Product {
    name: string;
    name_search: string;
    pc_netto: number;
    pc_vat: number;
    pc_brutto: number;
    mc_netto: number;
    mc_vat: number;
    mc_brutto: number;
    supplier: string;
    uid?: string;
    date: firebase.firestore.FieldValue;
}

export const EmptyProduct = {
    name: '',
    name_search: '',
    pc_netto: 0,
    pc_vat: 0,
    pc_brutto: 0,
    mc_netto: 0,
    mc_vat: 0,
    mc_brutto: 0,
    supplier: '',
    uid: '',
    date: firebase.firestore.FieldValue.serverTimestamp()
};

