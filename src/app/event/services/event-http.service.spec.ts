import { TestBed } from '@angular/core/testing';

import { EventHttpService } from './event-http.service';

describe('EventHttpService', () => {
  let service: EventHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
