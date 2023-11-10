import { TestBed } from '@angular/core/testing';

import { GetTokenDataService } from './get-token-data.service';

describe('GetTokenDataService', () => {
  let service: GetTokenDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTokenDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
