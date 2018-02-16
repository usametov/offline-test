import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Converter.ComponentComponent } from './converter.component.component';

describe('Converter.ComponentComponent', () => {
  let component: Converter.ComponentComponent;
  let fixture: ComponentFixture<Converter.ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Converter.ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Converter.ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
