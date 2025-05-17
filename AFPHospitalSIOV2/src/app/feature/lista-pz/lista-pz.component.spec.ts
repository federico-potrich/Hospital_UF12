import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPzComponent } from './lista-pz.component';

describe('ListaPzComponent', () => {
  let component: ListaPzComponent;
  let fixture: ComponentFixture<ListaPzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPzComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
