import { Component, OnInit, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-option',
  template: `
  <div class="option">
    <ng-content></ng-content>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent implements OnInit {
  @Input() value: string;
  click$: Observable<string>;

  constructor(private host: ElementRef) { }

  ngOnInit() {
    this.click$ = fromEvent(this.element, 'click').pipe(mapTo(this.value));
  }

  get element() {
    return this.host.nativeElement;
  }

}
