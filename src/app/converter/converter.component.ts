import { Component, OnInit, OnDestroy } from '@angular/core';
import { RateStore } from '../states/store/rate.store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/do';
import { timer } from 'rxjs/observable/timer';
import { RateRequest } from '../models/rate.request';
import { RequestRate } from '../states/actions/rates';
import { RateState } from '../states/reducers/ratefixer';
import { RateResponse } from '../models/rate.response';
import { ServerError } from '../models/server-error';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnDestroy {

  errorMessage: string;
  conversionForm: FormGroup;
  subscription: Subscription;

  constructor(private rateStore: RateStore) {

    this.conversionForm = new FormGroup({
      amount: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*\.?[0-9]{0,2}$')])),
      srcCurrency: new FormControl('CAD', Validators.required),
      convertedAmount: new FormControl(),
      targetCurrency: new FormControl('CAD', Validators.required)
    });

    this.onConverterParamsChange();
  }

  isAmount(val): boolean {
    return +val > 0;
  }

  amountInvalid(): boolean {
    return this.conversionForm.get('amount').value.length > 0
    && !this.isAmount(this.conversionForm.get('amount').value);
  }

  onConverterParamsChange() {
    const amountControl = this.conversionForm.get('amount');
    const srcCurrencyControl = this.conversionForm.get('srcCurrency');
    const targetCurrencyControl = this.conversionForm.get('targetCurrency');
    const convertedAmountControl = this.conversionForm.get('convertedAmount');

    const rateRequests = amountControl.valueChanges
    .filter(v => !amountControl.invalid && this.isAmount(v))
    .do(_ => console.log('after filter', amountControl.invalid))
    .combineLatest(
        srcCurrencyControl.valueChanges.startWith('CAD')
      , targetCurrencyControl.valueChanges.startWith('CAD')
    ).debounce(() => timer(500));

    this.subscription = rateRequests.subscribe(([amount, from, to]) => {

      const amt = Number.parseFloat(amount);
      this.rateStore.requestRate(from as String, to as String, amt);

       this.rateStore.getRate().subscribe((response: RateState) => {
        response.data.caseOf({

          right: (r: RateResponse) => {

            if (!isNaN(r.rates[to])) {
              convertedAmountControl.setValue(amt * r.rates[to]);
            } else { convertedAmountControl.setValue(0); }

            this.errorMessage = ''; },

          left: (err: ServerError) =>  {
            err.errorMessage === '' ?
            this.errorMessage = 'unknown error!' :
            this.errorMessage = err.errorMessage; }
        });
       });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
