import { Component, inject } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';
import { UserInputComponent } from '@components/user-input/user-input.component';
import { InvestmentResultsComponent } from '@components/investment-results/investment-results.component';
import { InvestmentResultsService } from './services/investment-results.service';
import InvestmentQuery from '@models/investment-query.interface';
import AnnualData from '@models/annual-data.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected investmentQuery?: InvestmentQuery;
  protected annualData?: AnnualData[];
  private readonly investmentResultsService = inject(InvestmentResultsService);

  protected onReset() {
    this.investmentQuery = undefined;
    this.annualData = undefined;
  }

  protected onRandom() {
    const randomInvestmentQuery: InvestmentQuery = {
      initialInvestment: this.getRandomNumber(500, 5000),
      annualInvestment: this.getRandomNumber(0, 10000),
      expectedReturn: this.getRandomNumber(1, 15),
      duration: this.getRandomNumber(5, 20),
    };
    this.investmentQuery = randomInvestmentQuery;
    this.annualData = this.investmentResultsService.calculateInvestmentResults(randomInvestmentQuery);
  }

  protected onCalculate(investmentQuery: InvestmentQuery) {
    this.annualData = this.investmentResultsService.calculateInvestmentResults(investmentQuery);
  }

  private getRandomNumber(lowerBound: number, upperBound: number) {
    return Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
  }
}
