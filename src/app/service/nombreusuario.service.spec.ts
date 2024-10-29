import { TestBed } from '@angular/core/testing';

import { NombreusuarioService } from './nombreusuario.service';

describe('NombreusuarioService', () => {
  let service: NombreusuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NombreusuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
