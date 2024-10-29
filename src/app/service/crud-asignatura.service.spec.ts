import { TestBed } from '@angular/core/testing';

import { CrudAsignaturaService } from './crud-asignatura.service';

describe('CrudAsignaturaService', () => {
  let service: CrudAsignaturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudAsignaturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
