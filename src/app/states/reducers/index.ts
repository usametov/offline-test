import {RateReducer, RateState} from './ratefixer';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
  rate: RateState;
}

export const reducers: ActionReducerMap<State> = {
  rate: RateReducer
};

