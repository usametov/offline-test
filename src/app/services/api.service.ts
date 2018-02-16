import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { RATE_API } from '../constants';
import { ServerError } from '../models/server-error';
import { Either } from 'tsmonad';
import 'rxjs/add/observable/of';
import { RateRequest } from '../models/rate.request';

@Injectable()
export class ApiService {
  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });

  constructor(private http: Http) {
  }

  private getJson(response: Response) {
    return response.json();
  }

  private checkForError(response: Response): Either<ServerError, any> {
  // console.log("check4err", response);
    return response.status >= 200 && response.status < 300 ?
      Either.right<ServerError, any>(this.getJson(response)) :
      Either.left<ServerError, any>(new ServerError(response.status, response.statusText));
  }

  getConversionRate( rateRequest: RateRequest): Observable<Either<ServerError, any>> {

    return this.http.get(`${RATE_API}?base=${rateRequest.From}&symbols=${rateRequest.To}`, { headers: this.headers })
      .map((res) => this.checkForError(res))
      .catch((err, cought) => {

        const errMsg = err.statusText === '' ?
          'server is not available' :
          err.statusText;

        return Observable.of(Either.left<ServerError, any>(new ServerError(0, errMsg)));
    });
  }
}
