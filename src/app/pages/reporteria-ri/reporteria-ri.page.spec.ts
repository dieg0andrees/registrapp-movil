import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReporteriaRiPage } from './reporteria-ri.page';

describe('ReporteriaRiPage', () => {
  let component: ReporteriaRiPage;
  let fixture: ComponentFixture<ReporteriaRiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteriaRiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
