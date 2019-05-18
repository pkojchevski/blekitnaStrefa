import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, EmptyProduct } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { MdbTableDirective } from 'angular-bootstrap-md';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { DeleteService } from 'src/app/services/delete.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  editField: string;
  searchText = '';

  productList$: Observable<any>;
  productList: Product[];
  previous: string;
  lastKeyPressed = 0;
  deleteStatus$: Observable<any>;


  constructor(private productService: ProductsService,
    private modalService: ModalService,
    private deleteService: DeleteService) { }

  ngOnInit() {
    this.productList$ = this.productService.getAllProducts();
    this.productList$.subscribe(products => {
      this.productList = products;
      localStorage.setItem('productList', JSON.stringify(products));
    });
    this.deleteStatus$ = this.deleteService.deleteObs$;
  }

  onkeyup(event) {

    if (event.timeStamp - this.lastKeyPressed > 200) {
      if (this.searchText === '') {
        this.productList = JSON.parse(localStorage.getItem('productList'));
      }
      this.productList = this.productList.filter((product: Product) =>
        product.name_search.includes(this.searchText) === true);
    }
    this.lastKeyPressed = event.timeStamp;
  }


  updateList(event: any, name: string, product: Product) {
    this.changeValue(event, name, product);
    this.productService.updateProduct(product);
  }

  removeProduct(uid: string) {
    this.modalService.init(DeleteModalComponent);
    this.deleteStatus$.subscribe(status => {
      if (status) {
        this.productService.deleteProduct(uid);
      }
    });
  }

  addNewRowInTable() {
    this.productService.addProduct(EmptyProduct);
  }

  changeValue(event: any, name: string, currProduct: Product) {
    switch (name) {
      case 'name':
        currProduct.name = event.target.textContent;
        currProduct.name_search = currProduct.name.replace(/\s/g, '').toLowerCase();
        break;
      case 'pc_netto':
        currProduct.pc_netto = +event.target.textContent;
        currProduct.pc_brutto = +((1 + currProduct.pc_vat / 100) * +currProduct.pc_netto).toFixed(2);
        break;
      case 'pc_vat':
        currProduct.pc_vat = +event.target.textContent;
        currProduct.pc_brutto = +((1 + currProduct.pc_vat / 100) * +currProduct.pc_netto).toFixed(2);
        break;
      case 'mc_netto':
        currProduct.mc_netto = +event.target.textContent;
        currProduct.mc_brutto = +((1 + currProduct.mc_vat / 100) * +currProduct.mc_netto).toFixed(2);
        break;
      case 'mc_vat':
        currProduct.mc_vat = +event.target.textContent;
        currProduct.mc_brutto = +((1 + currProduct.mc_vat / 100) * +currProduct.mc_netto).toFixed(2);
        break;
      case 'supplier':
        currProduct.supplier = event.target.textContent;
    }

  }

}
