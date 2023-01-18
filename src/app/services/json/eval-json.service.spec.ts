import { TestBed } from '@angular/core/testing';

import { EvalJsonService } from './eval-json.service';

describe('EvalJsonService', () => {
  let service: EvalJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvalJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
