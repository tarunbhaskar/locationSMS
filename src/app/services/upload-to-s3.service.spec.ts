import { TestBed } from '@angular/core/testing';

import { UploadToS3Service } from './upload-to-s3.service';

describe('UploadToS3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadToS3Service = TestBed.get(UploadToS3Service);
    expect(service).toBeTruthy();
  });
});
