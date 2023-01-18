import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalImagesAndSoundsComponent } from './eval-images-and-sounds.component';

describe('EvalImagesAndSoundsComponent', () => {
  let component: EvalImagesAndSoundsComponent;
  let fixture: ComponentFixture<EvalImagesAndSoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalImagesAndSoundsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvalImagesAndSoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
