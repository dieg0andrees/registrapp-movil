import { TestBed } from '@angular/core/testing';

import { CrudAlumnoService } from './crud-alumno.service';

describe('CrudAlumnoService', () => {
  let service: CrudAlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudAlumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
