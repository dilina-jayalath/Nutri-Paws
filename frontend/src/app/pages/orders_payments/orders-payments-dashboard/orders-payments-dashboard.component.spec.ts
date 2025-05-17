import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPaymentsDashboardComponent } from './orders-payments-dashboard.component';

describe('OrdersPaymentsDashboardComponent', () => {
  let component: OrdersPaymentsDashboardComponent;
  let fixture: ComponentFixture<OrdersPaymentsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersPaymentsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersPaymentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
