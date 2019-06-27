import { TestBed } from '@angular/core/testing';

import { UpdateLocationService } from './update-location.service';

describe('UpdateLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateLocationService = TestBed.get(UpdateLocationService);
    expect(service).toBeTruthy();
  });
});
