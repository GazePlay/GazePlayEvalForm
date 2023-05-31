import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticEvalComponent } from './automatic-eval.component';

describe('AutomaticEvalComponent', () => {
  let component: AutomaticEvalComponent;
  let fixture: ComponentFixture<AutomaticEvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomaticEvalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomaticEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
