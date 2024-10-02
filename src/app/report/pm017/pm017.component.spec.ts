import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM017Component } from './pm017.component';

describe('PM017Component', () => {
  let component: PM017Component;
  let fixture: ComponentFixture<PM017Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM017Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM017Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
