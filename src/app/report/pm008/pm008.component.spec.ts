import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM008Component } from './pm008.component';

describe('PM008Component', () => {
  let component: PM008Component;
  let fixture: ComponentFixture<PM008Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM008Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM008Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
