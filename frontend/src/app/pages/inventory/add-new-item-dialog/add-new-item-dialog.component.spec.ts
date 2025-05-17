import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewItemDialogComponent } from './add-new-item-dialog.component';

describe('AddNewItemDialogComponent', () => {
  let component: AddNewItemDialogComponent;
  let fixture: ComponentFixture<AddNewItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewItemDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
