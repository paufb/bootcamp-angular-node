import { Injectable } from '@angular/core';
import AnnualData from '@models/annual-data.interface';
import InvestmentQuery from '@models/investment-query.interface';

@Injectable({
  providedIn: 'root'
})
export class InvestmentResultsService {
  calculateInvestmentResults(investmentQuery: InvestmentQuery) {
    const { initialInvestment, annualInvestment, expectedReturn, duration } = investmentQuery;
    const annualData: AnnualData[] = [];
    let investmentValue = initialInvestment;
    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
    return annualData;
  }
}
