import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupAlertComponent } from './sup-alert.component';

describe('SupAlertComponent', () => {
  let component: SupAlertComponent;
  let fixture: ComponentFixture<SupAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
