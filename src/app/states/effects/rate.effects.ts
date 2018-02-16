import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {RequestRate, ActionTypes, RateReply
      , Reply, RateActions} from '../actions/rates';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import {ApiService} from '../../services/api.service';
import {Rate} from '../../models/rate';
import {RateResponse} from '../../models/rate.response';
import {ServerError} from '../../models/server-error';
import { Action } from '@ngrx/store';
import {Either} from 'tsmonad';

@Injectable()
export class RateEffects {

  constructor(private rateService: ApiService,
              private actions$: Actions) {
  console.log(this.rateService);
  }

  @Effect()
  requestRate$ =
    this.actions$.ofType(ActionTypes.REQUEST_RATE)
    .switchMap((action: RequestRate) =>
      this.rateService.getConversionRate(action.payload))
    .map(ei => ei.bind(r => Either.right<ServerError, RateResponse>(r)))
    .map(reply => new Reply(reply));
}


