import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM003AComponent } from './pm003-a.component';

describe('PM003AComponent', () => {
  let component: PM003AComponent;
  let fixture: ComponentFixture<PM003AComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM003AComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM003AComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
