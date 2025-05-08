import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import AnnualData from '@models/annual-data.interface';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
  animations: [
    trigger('fadeIn', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, scale: .95 }),
          stagger(25, animate('.25s ease-in-out', style({ opacity: 1, scale: 1 })))
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1, scale: 1 }),
          stagger(-25, animate('.25s ease-in-out', style({ opacity: 0, scale: .95 })))
        ], { optional: true })
      ])
    ])
  ]
})
export class InvestmentResultsComponent {
  readonly annualData = input.required<AnnualData[]>();
}
