import { TestBed } from '@angular/core/testing';

import { AsideNavbarService } from './aside-navbar.service';

describe('AsideNavbarService', () => {
  let service: AsideNavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsideNavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
