import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthPicker } from './month-picker';

describe('MonthPicker', () => {
  let component: MonthPicker;
  let fixture: ComponentFixture<MonthPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthPicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthPicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
