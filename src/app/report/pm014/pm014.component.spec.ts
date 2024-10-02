import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM014Component } from './pm014.component';

describe('PM014Component', () => {
  let component: PM014Component;
  let fixture: ComponentFixture<PM014Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM014Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM014Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
