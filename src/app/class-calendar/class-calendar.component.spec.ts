import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCalendarComponent } from './class-calendar.component';

describe('ClassCalendarComponent', () => {
  let component: ClassCalendarComponent;
  let fixture: ComponentFixture<ClassCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
