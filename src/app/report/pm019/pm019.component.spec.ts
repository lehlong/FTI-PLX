import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM019Component } from './pm019.component';

describe('PM019Component', () => {
  let component: PM019Component;
  let fixture: ComponentFixture<PM019Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM019Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM019Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
