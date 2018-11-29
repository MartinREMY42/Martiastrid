import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelPaymentComponent } from './cancel-payment.component';

describe('CancelPaymentComponent', () => {
  let component: CancelPaymentComponent;
  let fixture: ComponentFixture<CancelPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
