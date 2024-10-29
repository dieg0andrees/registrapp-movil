import { TestBed } from '@angular/core/testing';

import { CrudProfesorService } from './crud-profesor.service';

describe('CrudProfesorService', () => {
  let service: CrudProfesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudProfesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
