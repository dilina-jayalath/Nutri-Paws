import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InHouseOrdersComponent } from './in-house-orders.component';

describe('InHouseOrdersComponent', () => {
  let component: InHouseOrdersComponent;
  let fixture: ComponentFixture<InHouseOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InHouseOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InHouseOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
