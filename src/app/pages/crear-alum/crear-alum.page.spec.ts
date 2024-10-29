import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearAlumPage } from './crear-alum.page';

describe('CrearAlumPage', () => {
  let component: CrearAlumPage;
  let fixture: ComponentFixture<CrearAlumPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAlumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
