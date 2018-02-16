import { Component, OnInit } from '@angular/core';
import { RateStore } from '../states/store/rate.store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/startWith';
import { timer } from 'rxjs/observable/timer';
import { RateRequest } from '../models/rate.request';
import { RequestRate } from '../states/actions/rates';
import { RateState } from '../states/reducers/ratefixer';
import { RateResponse } from '../models/rate.response';
import { ServerError } from '../models/server-error';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent {

  errorMessage: string;
  conversionForm: FormGroup;

  constructor(private rateStore: RateStore) {

    this.conversionForm = new FormGroup({
      amount: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{0,6}\.?[0-9]{0,2}$')])),
      srcCurrency: new FormControl('CAD', Validators.required),
      convertedAmount: new FormControl(),
      targetCurrency: new FormControl('CAD', Validators.required)
    });

    this.onConverterParamsChange();
  }

  onConverterParamsChange() {
    const amountControl = this.conversionForm.get('amount');
    const srcCurrencyControl = this.conversionForm.get('srcCurrency');
    const targetCurrencyControl = this.conversionForm.get('targetCurrency');
    const convertedAmountControl = this.conversionForm.get('convertedAmount');

    const rateRequests = srcCurrencyControl.valueChanges.startWith('CAD')
    .combineLatest(
        amountControl.valueChanges
      , targetCurrencyControl.valueChanges.startWith('CAD')
      // , (from,amount, to) => ({From: from, To: to, Amount: amount})
    ).debounce(() => timer(500));

    rateRequests.subscribe(([from, amount, to]) => {
      console.log([amount, from, to]);
      const amt = Number.parseFloat(amount);
      this.rateStore.requestRate(from as String, to as String, amt);

       this.rateStore.getRate().subscribe((response: RateState) => {
        response.data.caseOf({
          right: (r: RateResponse) => convertedAmountControl.setValue(amt * r.rates[to]),
          left: (err: ServerError) =>  { err.errorMessage === '' ?
                                        this.errorMessage = 'unknown error!' :
                                        this.errorMessage = err.errorMessage; }
        });
       });
    });
  }

}
