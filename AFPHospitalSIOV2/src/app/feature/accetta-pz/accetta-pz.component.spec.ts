import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccettaPzComponent } from './accetta-pz.component';

describe('AccettaPzComponent', () => {
  let component: AccettaPzComponent;
  let fixture: ComponentFixture<AccettaPzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccettaPzComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccettaPzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
