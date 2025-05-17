import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InHouseOrderManageComponent } from './in-house-order-manage.component';

describe('InHouseOrderManageComponent', () => {
  let component: InHouseOrderManageComponent;
  let fixture: ComponentFixture<InHouseOrderManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InHouseOrderManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InHouseOrderManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
