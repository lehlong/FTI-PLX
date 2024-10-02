import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM018Component } from './pm018.component';

describe('PM018Component', () => {
  let component: PM018Component;
  let fixture: ComponentFixture<PM018Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM018Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM018Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
