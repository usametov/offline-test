import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ConverterComponent } from './converter/converter.component';
import { RateEffects } from './states/effects/rate.effects';
import { EffectsModule } from '@ngrx/effects';
import { RateStore } from './states/store/rate.store';
import { StoreModule } from '@ngrx/store';
import { reducers } from './states/reducers/index';
import { ApiService } from './services/api.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([RateEffects]),
    StoreModule.forRoot(reducers),
  ],
  providers: [RateStore, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
