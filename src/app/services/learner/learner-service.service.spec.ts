import { TestBed } from '@angular/core/testing';

import { LearnerServiceService } from './learner-service.service';

describe('LearnerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearnerServiceService = TestBed.get(LearnerServiceService);
    expect(service).toBeTruthy();
  });
});
