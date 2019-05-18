import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product';

import { take, filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private afs: AngularFirestore) { }


  getAllProducts(): Observable<Product[]> {
    return this.afs.collection<Product>('products', ref => ref.orderBy('date')).valueChanges();
  }

  async addProduct(product: Product) {
    try {
      product.uid = this.afs.createId();
      product.name_search = product.name.replace(/\s/g, '').toLowerCase();
      await this.afs.collection('products').doc(product.uid).set(product);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  searchProducts(searchValue: string) {
    return this.afs.collection(`products`, ref => ref
      .orderBy('name_search')
      .startAt(searchValue.toLowerCase())
      .endAt(searchValue.toLowerCase() + '\uf8ff'))
      .valueChanges();
  }



  async updateProduct(product: Product) {
    try {
      product.name_search = product.name.toLowerCase().trim();
      await this.afs.collection('products').doc(product.uid).update(product);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  getProduct(uid) {
    return this.afs.collection('products').doc(uid).valueChanges();
  }

  async deleteProduct(uid: string) {
    try {
      await this.afs.collection('products').doc(uid).delete();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
