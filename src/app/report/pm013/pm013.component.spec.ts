import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM013Component } from './pm013.component';

describe('PM013Component', () => {
  let component: PM013Component;
  let fixture: ComponentFixture<PM013Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM013Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM013Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
