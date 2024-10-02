import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM010AComponent } from './pm010-a.component';

describe('PM010AComponent', () => {
  let component: PM010AComponent;
  let fixture: ComponentFixture<PM010AComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM010AComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM010AComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
