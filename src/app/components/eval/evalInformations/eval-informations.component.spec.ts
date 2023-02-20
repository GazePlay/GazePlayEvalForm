import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EvalInformationsComponent} from './eval-informations.component';

describe('EvalInformationsComponent', () => {
  let component: EvalInformationsComponent;
  let fixture: ComponentFixture<EvalInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvalInformationsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EvalInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
