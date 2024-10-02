import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM004AComponent } from './pm004-a.component';

describe('PM004AComponent', () => {
  let component: PM004AComponent;
  let fixture: ComponentFixture<PM004AComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM004AComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM004AComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
