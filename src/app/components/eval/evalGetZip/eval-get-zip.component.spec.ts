import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EvalGetZipComponent} from './eval-get-zip.component';

describe('EvalGetZipComponent', () => {
  let component: EvalGetZipComponent;
  let fixture: ComponentFixture<EvalGetZipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvalGetZipComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EvalGetZipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
