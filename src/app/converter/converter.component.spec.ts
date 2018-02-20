import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterComponent } from './converter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../states/reducers/index';
import { RateStore } from '../states/store/rate.store';

describe('Converter.ComponentComponent', () => {
  let component: ConverterComponent;
  let fixture: ComponentFixture<ConverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [ ConverterComponent ],
      providers: [RateStore],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();
    done();
  });
});
