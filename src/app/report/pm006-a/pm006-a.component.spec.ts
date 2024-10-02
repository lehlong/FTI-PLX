import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM006AComponent } from './pm006-a.component';

describe('PM006AComponent', () => {
  let component: PM006AComponent;
  let fixture: ComponentFixture<PM006AComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM006AComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM006AComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
