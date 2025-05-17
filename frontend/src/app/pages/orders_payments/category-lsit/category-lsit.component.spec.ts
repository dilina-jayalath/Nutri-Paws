import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryLsitComponent } from './category-lsit.component';

describe('CategoryLsitComponent', () => {
  let component: CategoryLsitComponent;
  let fixture: ComponentFixture<CategoryLsitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryLsitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryLsitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
