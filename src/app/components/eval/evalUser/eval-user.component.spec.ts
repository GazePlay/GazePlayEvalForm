import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalUserComponent } from './eval-user.component';

describe('EvalUserComponent', () => {
  let component: EvalUserComponent;
  let fixture: ComponentFixture<EvalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
