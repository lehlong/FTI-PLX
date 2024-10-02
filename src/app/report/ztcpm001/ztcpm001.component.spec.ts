import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ztcpm001Component } from './ztcpm001.component';

describe('Ztcpm001Component', () => {
  let component: Ztcpm001Component;
  let fixture: ComponentFixture<Ztcpm001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ztcpm001Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Ztcpm001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
