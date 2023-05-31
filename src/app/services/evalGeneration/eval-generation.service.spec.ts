import { TestBed } from '@angular/core/testing';

import { EvalGenerationService } from './eval-generation.service';

describe('EvalGenerationService', () => {
  let service: EvalGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvalGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
