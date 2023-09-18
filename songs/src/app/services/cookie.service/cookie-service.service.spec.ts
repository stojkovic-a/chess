import { TestBed } from '@angular/core/testing';

// import { CookieServiceService } from './cookie-service.service';
import { CookieService } from './cookie-service.service';

describe('CookieServiceService', () => {
  let service: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
