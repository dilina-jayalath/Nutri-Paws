import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSupplierItemComponent } from './add-new-supplier-item.component';

describe('AddNewSupplierItemComponent', () => {
  let component: AddNewSupplierItemComponent;
  let fixture: ComponentFixture<AddNewSupplierItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewSupplierItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewSupplierItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
