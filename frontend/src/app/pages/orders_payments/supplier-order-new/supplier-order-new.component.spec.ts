import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOrderNewComponent } from './supplier-order-new.component';

describe('SupplierOrderNewComponent', () => {
  let component: SupplierOrderNewComponent;
  let fixture: ComponentFixture<SupplierOrderNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierOrderNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierOrderNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
