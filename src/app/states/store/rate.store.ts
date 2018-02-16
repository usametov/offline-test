import {Rate} from '../../models/rate';
import {Injectable} from '@angular/core';
import {StoreInterface} from './store.interface';
import { Observable } from 'rxjs/Observable';
import { Store, createSelector } from '@ngrx/store';
import {RateReducer, RateState} from '../reducers/ratefixer';
import { State } from '../reducers';
import {RateReply, ActionTypes, RequestRate} from '../actions/rates';
import {ServerError} from '../../models/server-error';
import {ResponseStatus} from '../../models/response.status';
import 'rxjs/add/operator/distinctUntilKeyChanged';
import 'rxjs/add/operator/filter';

@Injectable()
export class RateStore implements StoreInterface<RateState> {

  protected state: Store<RateState>;

  constructor(public store: Store<State>, ) {
    this.state = this.store.select('rate'); // listen for rate reducer
  }

  getState(): Store<RateState> {
    return this.state;
  }

  requestRate(base: String, symbol: String, amount: Number) {

    const action = new RequestRate({From: base, To: symbol, Amount: amount});
    this.store.dispatch(action);
  }

  getRate() {
    return this.getState()
    .filter(state => state.status !== ResponseStatus.Pending)
    .distinctUntilKeyChanged('status');
  }
}
