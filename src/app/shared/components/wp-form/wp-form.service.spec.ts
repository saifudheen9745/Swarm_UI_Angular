import { TestBed } from '@angular/core/testing';

import { WpFormService } from './wp-form.service';

describe('WpFormService', () => {
  let service: WpFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WpFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
