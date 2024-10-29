import { TestBed } from '@angular/core/testing';

import { ApiTiempoService } from './api-tiempo.service';

describe('ApiTiempoService', () => {
  let service: ApiTiempoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTiempoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
