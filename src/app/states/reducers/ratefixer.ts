import { ActionTypes, RateActions, RateReply } from '../actions/rates';
import { ServerError } from '../../models/server-error';
import { Either } from 'tsmonad';

import { Action } from '@ngrx/store';
import {ResponseStatus} from '../../models/response.status';
import { Rate } from '../../models/rate';

export interface RateState {
  data: RateReply;
  status: ResponseStatus;
}

export const initialState: RateState = {
  data: Either.right({
    base: 'N/A', date: null, rates: new Map<String, Number>()
  }),
  status: ResponseStatus.Pending
};

export function RateReducer(state = initialState, action: RateActions)
: RateState {

  console.log('reducer', action);
  switch (action.type) {
    case ActionTypes.REQUEST_RATE:
      return initialState;
    case ActionTypes.RATE_REPLY:
      return Object.assign({}, state,
         {data: action.payload, status: ResponseStatus.Complete});
    default:
        return initialState;
  }
}



