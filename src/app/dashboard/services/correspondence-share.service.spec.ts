import { TestBed } from '@angular/core/testing';

import { CorrespondenceShareService } from './correspondence-share.service';

describe('CorrespondenceShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorrespondenceShareService = TestBed.get(CorrespondenceShareService);
    expect(service).toBeTruthy();
  });
});
