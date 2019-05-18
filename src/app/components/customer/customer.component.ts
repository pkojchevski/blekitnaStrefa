import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, EmptyCustomer } from 'src/app/models/customer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers$: Observable<any[]>;
  lastKeyPressed: number;
  searchText: string;
  currCustomer: Customer = EmptyCustomer;


  constructor(private customerService: CustomersService) { }

  ngOnInit() {
    this.customers$ = this.customerService.getAllCustomers();
  }

  onkeyup(event) {
    if (event.timeStamp - this.lastKeyPressed > 200) {
      if (this.searchText === '') {
        // this.customers$ = JSON.parse(localStorage.getItem('customers$'));
      }
      // this.customers$ = this.customers$.filter((product: Product) =>
      //   product.name_search.includes(this.searchText) === true);
    }
    this.lastKeyPressed = event.timeStamp;
  }


  updateList(event, customer: Customer, name: string) {
    switch (name) {
      case 'name':
        const customername = event.target.textContent;
        customer.name = customername;
        customer.name_search = (customername).replace(/\s/g, '').toLowerCase();
        break;
      case 'astreet':
        customer.address.street = event.target.textContent;
        break;
      case 'acode':
        customer.address.code = event.target.textContent;
        break;
      case 'acity':
        customer.address.city = event.target.textContent;
        break;
      case 'aregion':
        customer.address.region = event.target.textContent;
        break;
      case 'castreet':
        customer.coresspondingAddress.street = event.target.textContent;
        break;
      case 'cacode':
        customer.coresspondingAddress.code = event.target.textContent;
        break;
      case 'cacity':
        customer.coresspondingAddress.city = event.target.textContent;
        break;
      case 'caregion':
        customer.coresspondingAddress.region = event.target.textContent;
        break;
      case 'email':
        customer.email = event.target.textContent;
        break;
      case 'contactName':
        customer.contactName = event.target.textContent;
        break;
    }
    console.log('customer:', customer);
    this.customerService.updateCustomer(customer);
  }

  // removeProduct(uid: string) {
  //   this.modalService.init(DeleteModalComponent);
  //   this.deleteStatus$.subscribe(status => {
  //     if (status) {
  //       this.productService.deleteProduct(uid);
  //     }
  //   });
  // }

  addNewRowInTable() {
    this.customerService.addCustomer(EmptyCustomer);
  }

  changeValue(event: any, name: string, currCustomer: Customer) {

  }


}
