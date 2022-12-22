import { TestBed } from '@angular/core/testing';

import { BrowsemeService } from './browseme.service';

describe('BrowsemeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrowsemeService = TestBed.get(BrowsemeService);
    expect(service).toBeTruthy();
  });
});
