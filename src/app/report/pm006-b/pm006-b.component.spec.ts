import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM006BComponent } from './pm006-b.component';

describe('PM006BComponent', () => {
  let component: PM006BComponent;
  let fixture: ComponentFixture<PM006BComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM006BComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM006BComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
