import { TestBed } from '@angular/core/testing';

import { ProfileComponentServiceService } from './profile-component-service.service';

describe('ProfileComponentServiceService', () => {
  let service: ProfileComponentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileComponentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
