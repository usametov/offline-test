import { Observable } from 'rxjs/Observable';
import { Either } from 'tsmonad';
import { ServerError } from '../../models/server-error';

export interface StoreInterface<T> {
  getState(): Observable<T>;
}
