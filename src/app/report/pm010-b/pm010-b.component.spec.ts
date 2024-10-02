import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM010BComponent } from './pm010-b.component';

describe('PM010BComponent', () => {
  let component: PM010BComponent;
  let fixture: ComponentFixture<PM010BComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM010BComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM010BComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
