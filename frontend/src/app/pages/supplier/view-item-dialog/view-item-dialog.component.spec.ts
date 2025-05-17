import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemDialogComponent } from './view-item-dialog.component';

describe('ViewItemDialogComponent', () => {
  let component: ViewItemDialogComponent;
  let fixture: ComponentFixture<ViewItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewItemDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
