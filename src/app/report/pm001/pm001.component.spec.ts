import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM001Component } from './pm001.component';

describe('PM001Component', () => {
  let component: PM001Component;
  let fixture: ComponentFixture<PM001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM001Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
