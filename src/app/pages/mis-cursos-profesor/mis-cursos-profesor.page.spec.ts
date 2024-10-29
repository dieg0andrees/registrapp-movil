import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisCursosProfesorPage } from './mis-cursos-profesor.page';

describe('MisCursosProfesorPage', () => {
  let component: MisCursosProfesorPage;
  let fixture: ComponentFixture<MisCursosProfesorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MisCursosProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
