import { TestBed } from '@angular/core/testing';

import { MyJwtInterceptorService } from './my-jwt-interceptor.service';

describe('MyJwtInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyJwtInterceptorService = TestBed.get(MyJwtInterceptorService);
    expect(service).toBeTruthy();
  });
});
