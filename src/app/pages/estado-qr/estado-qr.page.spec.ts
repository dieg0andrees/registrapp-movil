import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadoQrPage } from './estado-qr.page';

describe('EstadoQrPage', () => {
  let component: EstadoQrPage;
  let fixture: ComponentFixture<EstadoQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
