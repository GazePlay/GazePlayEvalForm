import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualEvalComponent } from './manual-eval.component';

describe('ManualEvalComponent', () => {
  let component: ManualEvalComponent;
  let fixture: ComponentFixture<ManualEvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualEvalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
