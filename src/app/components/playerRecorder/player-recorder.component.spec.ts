import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerRecorderComponent } from './player-recorder.component';

describe('PlayerRecorderComponent', () => {
  let component: PlayerRecorderComponent;
  let fixture: ComponentFixture<PlayerRecorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerRecorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerRecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
