import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaPartyComponent } from './pizza-party.component';

describe('PizzaPartyComponent', () => {
  let component: PizzaPartyComponent;
  let fixture: ComponentFixture<PizzaPartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaPartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
