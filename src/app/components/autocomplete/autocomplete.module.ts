import { NgModule } from '@angular/core';
import { OptionComponent } from './app-option.component';
import { AutocompleteComponent } from './app-autocomplete.component';
import { AutocompleteContentDirective } from './autocomplete-content.directive';
import { AutocompleteDirective } from './autocomplete.directive';
import { CommonModule } from '@angular/common';

const publicApi = [
    AutocompleteComponent,
    OptionComponent,
    AutocompleteContentDirective,
    AutocompleteDirective,
];

@NgModule({
    declarations: [
        publicApi
    ],
    imports: [
        CommonModule
    ],
    exports: [publicApi]
})
export class AutocompleteModule { }
