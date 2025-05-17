import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPaymentsComponent } from './system-payments.component';

describe('SystemPaymentsComponent', () => {
  let component: SystemPaymentsComponent;
  let fixture: ComponentFixture<SystemPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
