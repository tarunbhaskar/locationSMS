import { TestBed } from '@angular/core/testing';

import { RetrieveDetailService } from './retrieve-detail.service';

describe('RetrieveDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetrieveDetailService = TestBed.get(RetrieveDetailService);
    expect(service).toBeTruthy();
  });
});
