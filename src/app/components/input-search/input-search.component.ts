import { Component, OnInit, Input, Output, ElementRef, ViewChild, AfterViewInit, ContentChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from '../../models/quote';
import { Product } from 'src/app/models/product';
import { EventEmitter } from '@angular/core';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit, AfterViewInit {

  @Input() quote: Quote;
  @Input() product: Product;
  @Input() obs$: Observable<any[]>;

  @Output() listClicked = new EventEmitter();
  @Output() inputKeyDown = new EventEmitter();

  inputText: string;
  typing = false;

  @ViewChild('input') input: ElementRef;

  constructor(private elRef: ElementRef) {
    const keyUpStream = fromEvent(elRef.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      );

    keyUpStream.subscribe(input => {
      this.inputKeyDown.emit(input);
      this.typing = true;
    });
  }

  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }

  ngOnInit() {

    // this.obs$.subscribe(customers => console.log('customers:', customers));
  }

  onClick(obj) {
    this.inputText = obj.name;
    this.listClicked.emit(obj);
    this.typing = !this.typing;
  }

}
