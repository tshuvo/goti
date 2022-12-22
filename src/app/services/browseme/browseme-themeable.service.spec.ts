import { TestBed } from '@angular/core/testing';

import { BrowsemeThemeableService } from './browseme-themeable.service';

describe('BrowsemeThemeableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrowsemeThemeableService = TestBed.get(BrowsemeThemeableService);
    expect(service).toBeTruthy();
  });
});
