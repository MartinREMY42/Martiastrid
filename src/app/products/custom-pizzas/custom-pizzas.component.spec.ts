import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPizzasComponent } from './custom-pizzas.component';

describe('CustomPizzasComponent', () => {
  let component: CustomPizzasComponent;
  let fixture: ComponentFixture<CustomPizzasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPizzasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPizzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
