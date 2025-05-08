import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import InvestmentQuery from '@models/investment-query.interface';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent implements OnChanges {
  readonly investmentQuery = input<InvestmentQuery>();
  protected readonly reset = output<void>();
  protected readonly random = output<void>();
  protected readonly calculate = output<InvestmentQuery>();

  protected formGroup = new FormGroup({
    initialInvestment: new FormControl<number | null>(null, Validators.required),
    annualInvestment: new FormControl<number | null>(null, Validators.required),
    expectedReturn: new FormControl<number | null>(null, Validators.required),
    duration: new FormControl<number | null>(null, Validators.required),
  });

  ngOnChanges(changes: SimpleChanges) {
    const newInvestmentQuery = changes['investmentQuery'].currentValue as InvestmentQuery;
    if (newInvestmentQuery)
      this.formGroup.setValue(newInvestmentQuery);
  }

  protected onReset() {
    this.formGroup.reset();
    this.reset.emit();
  }

  protected onRandom() {
    this.formGroup.markAsUntouched();
    this.random.emit();
  }

  protected onSubmit() {
    if (this.formGroup.valid)
      this.calculate.emit(this.formGroup.value as InvestmentQuery);
  }
}
