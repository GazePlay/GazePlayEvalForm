import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChooseSoundComponent} from './choose-sound.component';

describe('ChooseSoundComponent', () => {
  let component: ChooseSoundComponent;
  let fixture: ComponentFixture<ChooseSoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseSoundComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChooseSoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
