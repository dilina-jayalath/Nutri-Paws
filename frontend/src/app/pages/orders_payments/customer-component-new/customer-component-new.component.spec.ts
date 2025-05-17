import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComponentNewComponent } from './customer-component-new.component';

describe('CustomerComponentNewComponent', () => {
  let component: CustomerComponentNewComponent;
  let fixture: ComponentFixture<CustomerComponentNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerComponentNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerComponentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
