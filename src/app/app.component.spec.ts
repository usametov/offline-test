import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ConverterComponent } from './converter/converter.component';
import { RateStore } from './states/store/rate.store';
import { StoreModule } from '@ngrx/store';
import { reducers } from './states/reducers/index';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [
        AppComponent,
        ConverterComponent
      ],
      providers: [RateStore],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
