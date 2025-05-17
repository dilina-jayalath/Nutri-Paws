import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecoondNavComponent } from './secoond-nav.component';

describe('SecoondNavComponent', () => {
  let component: SecoondNavComponent;
  let fixture: ComponentFixture<SecoondNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecoondNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecoondNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
