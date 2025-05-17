import { TestBed } from '@angular/core/testing';

import { SupplierProfileService } from './supplier-profile.service';

describe('SupplierProfileService', () => {
  let service: SupplierProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
