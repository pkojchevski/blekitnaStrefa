import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private afs: AngularFirestore) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.afs.collection<Customer>('customers', ref => ref.orderBy('createdAt')).valueChanges();
  }

  async addCustomer(customer: Customer) {
    try {
      customer.uid = this.afs.createId();
      customer.name_search = customer.name.replace(/\s/g, '').toLowerCase();
      console.log('customer:', customer);
      await this.afs.collection('customers').doc(customer.uid).set(customer);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  searchCustomers(value: string) {
    return this.afs.collection(`customers`, ref => ref
      .orderBy('name_search')
      .startAt(value.toLowerCase())
      .endAt(value.toLowerCase() + '\uf8ff'))
      .valueChanges();
  }

  // searchProducts(searchValue: string) {
  //   return this.afs.collection(`customers`, ref => ref
  //     .orderBy('name_search')
  //     .startAt(searchValue.toLowerCase())
  //     .endAt(searchValue.toLowerCase() + '\uf8ff'))
  //     .valueChanges();
  // }



  async updateCustomer(customer: Customer) {
    try {
      await this.afs.collection('customers').doc(customer.uid).update(customer);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  getCustomer(uid) {
    return this.afs.collection('customers').doc(uid).valueChanges();
  }

  async deleteCustomer(uid: string) {
    try {
      await this.afs.collection('customers').doc(uid).delete();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
