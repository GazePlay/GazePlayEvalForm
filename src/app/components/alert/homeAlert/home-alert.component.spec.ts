import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAlertComponent } from './home-alert.component';

describe('HomeAlertComponent', () => {
  let component: HomeAlertComponent;
  let fixture: ComponentFixture<HomeAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
