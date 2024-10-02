import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM011Component } from './pm011.component';

describe('PM011Component', () => {
  let component: PM011Component;
  let fixture: ComponentFixture<PM011Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM011Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM011Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
