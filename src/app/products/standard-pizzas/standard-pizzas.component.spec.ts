import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardPizzasComponent } from './standard-pizzas.component';

describe('StandardPizzasComponent', () => {
  let component: StandardPizzasComponent;
  let fixture: ComponentFixture<StandardPizzasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardPizzasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardPizzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
