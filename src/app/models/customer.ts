import * as firebase from 'firebase/app';
import 'firebase/firestore';

export interface Customer {
    uid: string;
    name: string;
    name_search: string;
    address: {
        street: string;
        code: string;
        city: string;
        region: string;
    };
    coresspondingAddress: {
        street: string;
        code: string;
        city: string,
        region: string,
    };
    contactName: string;
    email: string;
    createdAt: firebase.firestore.FieldValue;
}

export const EmptyCustomer = {
    uid: '',
    name: '',
    name_search: '',
    address: {
        street: '',
        code: '',
        city: '',
        region: '',
    },
    coresspondingAddress: {
        street: '',
        code: '',
        city: '',
        region: '',
    },
    email: '',
    contactName: '',
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
};


