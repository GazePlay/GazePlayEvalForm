import { TestBed } from '@angular/core/testing';

import { OrderProgressBarService } from './order-progress-bar.service';

describe('OrderProgressBarService', () => {
  let service: OrderProgressBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderProgressBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
