import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EvalScoresComponent} from './eval-scores.component';

describe('EvalScoresComponent', () => {
  let component: EvalScoresComponent;
  let fixture: ComponentFixture<EvalScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvalScoresComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EvalScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
