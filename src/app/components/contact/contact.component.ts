import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from 'src/app/models/quote';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  quotes$: Observable<Quote[]>;

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.quotes$ = this.quoteService.getAllQuotes();
  }

}
