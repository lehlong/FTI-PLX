import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM004BComponent } from './pm004-b.component';

describe('PM004BComponent', () => {
  let component: PM004BComponent;
  let fixture: ComponentFixture<PM004BComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM004BComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM004BComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
