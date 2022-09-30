import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridMatrixComponent } from './grid-matrix.component';

describe('GridMatrixComponent', () => {
  let component: GridMatrixComponent;
  let fixture: ComponentFixture<GridMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
