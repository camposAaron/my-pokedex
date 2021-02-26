import { TestBed } from '@angular/core/testing';

import { CriesService } from './cries.service';

describe('CriesService', () => {
  let service: CriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
