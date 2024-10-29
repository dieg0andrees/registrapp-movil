import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearProfePage } from './crear-profe.page';

describe('CrearProfePage', () => {
  let component: CrearProfePage;
  let fixture: ComponentFixture<CrearProfePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProfePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
