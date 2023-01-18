import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProgressBarComponent } from './order-progress-bar.component';

describe('OrderProgressBarComponent', () => {
  let component: OrderProgressBarComponent;
  let fixture: ComponentFixture<OrderProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProgressBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
