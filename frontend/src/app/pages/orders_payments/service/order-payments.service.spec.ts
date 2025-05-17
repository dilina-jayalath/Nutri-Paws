import { TestBed } from '@angular/core/testing';

import { OrderPaymentsService } from './order-payments.service';

describe('OrderPaymentsService', () => {
  let service: OrderPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
