import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaFavoriteSwitchComponent } from './pizza-favorite-switch.component';

describe('PizzaFavoriteSwitchComponent', () => {
  let component: PizzaFavoriteSwitchComponent;
  let fixture: ComponentFixture<PizzaFavoriteSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaFavoriteSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaFavoriteSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
