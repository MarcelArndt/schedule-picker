import { TestBed } from '@angular/core/testing';

import { DatpickerApiService } from './datpicker-api.service';

describe('DatpickerApiService', () => {
  let service: DatpickerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatpickerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
