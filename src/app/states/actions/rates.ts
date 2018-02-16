import { Action } from '@ngrx/store';
import { Either } from 'tsmonad';

import { RateRequest } from '../../models/rate.request';
import { ServerError } from '../../models/server-error';
import { RateResponse } from '../../models/rate.response';

export const ActionTypes = {
  REQUEST_RATE: '[RATE] Request',
  RATE_REPLY: '[RATE] Reply'
};

export type RateReply = Either<ServerError, RateResponse>;

export class RequestRate implements Action {

  readonly type = ActionTypes.REQUEST_RATE;

  constructor(public payload: RateRequest) {
  }
}

export class Reply implements Action {

  readonly type = ActionTypes.RATE_REPLY;

  constructor(public payload: RateReply) {
  }
}

export type RateActions = RequestRate | Reply;
