import { Component, OnInit, Input, ElementRef, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit {
  searchText: string;
  @Input() searchPlaceholder: string;

  @Output() inputKeyUp = new EventEmitter();

  constructor(private elRef: ElementRef) {
    const keyUpStream = fromEvent(elRef.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      );

    keyUpStream.subscribe((value: string) =>
      this.inputKeyUp.emit(value));
  }

  ngOnInit() {
  }

}
