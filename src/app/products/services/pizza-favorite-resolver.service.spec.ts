import { TestBed } from '@angular/core/testing';

import { PizzaFavoriteResolverService } from './pizza-favorite-resolver.service';

describe('PizzaFavoriteResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PizzaFavoriteResolverService = TestBed.get(PizzaFavoriteResolverService);
    expect(service).toBeTruthy();
  });
});
