import { TestBed } from '@angular/core/testing';

import { AddDetailsService } from './add-details.service';

describe('AddDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddDetailsService = TestBed.get(AddDetailsService);
    expect(service).toBeTruthy();
  });
});
