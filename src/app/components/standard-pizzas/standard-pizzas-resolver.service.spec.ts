import { TestBed } from '@angular/core/testing';

import { StandardPizzasResolverService } from './standard-pizzas-resolver.service';

describe('StandardPizzasResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StandardPizzasResolverService = TestBed.get(StandardPizzasResolverService);
    expect(service).toBeTruthy();
  });
});
