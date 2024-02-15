import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEvalComponent } from './import-eval.component';

describe('ImportEvalComponent', () => {
  let component: ImportEvalComponent;
  let fixture: ComponentFixture<ImportEvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportEvalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
