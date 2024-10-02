import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM012AComponent } from './pm012-a.component';

describe('PM012AComponent', () => {
  let component: PM012AComponent;
  let fixture: ComponentFixture<PM012AComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM012AComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM012AComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
