import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM006CComponent } from './pm006-c.component';

describe('PM006CComponent', () => {
  let component: PM006CComponent;
  let fixture: ComponentFixture<PM006CComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM006CComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM006CComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
