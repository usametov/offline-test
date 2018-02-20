import {Injectable, ReflectiveInjector} from '@angular/core';
import {
  Response, ResponseOptions,
  BaseRequestOptions, ConnectionBackend, Http,
  RequestOptions
} from '@angular/http';
import { RATE_API } from './../constants';
import { MockBackend, MockConnection } from '@angular/http/testing';
// import your service
import { ApiService} from './api.service';
import {RateResponse} from '../models/rate.response';
import {ServerError} from '../models/server-error';

describe('Service: Api', () => {

  const mockData = {
    'base': 'CAD', 'date': '2018-02-19'
  , 'rates': {'USD': 0.79592}};

  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
    {provide: ConnectionBackend, useClass: MockBackend},
    {provide: RequestOptions, useClass: BaseRequestOptions},
    Http,
    ApiService,
  ]);
  this.apiService =  this.injector.get(ApiService);
  this.backend = this.injector.get(ConnectionBackend) as MockBackend;
  this.backend.connections.subscribe((connection: MockConnection) => {
      this.lastConnection = connection;
  });
  });

  it('should call proper url', (done) => {

    this.apiService.getConversionRate({From: 'CAD', To: 'USD', Amount: 1.00});

    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toBe(`${RATE_API}?base=CAD&symbols=USD`);

    done();
  });

  it('should get rate', (done) => {

    let result: RateResponse;

    this.apiService.getConversionRate({From: 'CAD', To: 'USD', Amount: 1.00})
      .subscribe(ei => // the 'right' response should be assigned to RateResponse
          ei.caseOf({
              left: result = null,
              right: r => {result = r; }
          }));

    this.lastConnection.mockRespond(
      new Response(new ResponseOptions({
      body: mockData,
      status: 200
    })));

    expect(result).toBeTruthy();
    expect(result.base).toBe('CAD');
    expect(result.rates['USD']).toBeTruthy();
    done();
  });
});








