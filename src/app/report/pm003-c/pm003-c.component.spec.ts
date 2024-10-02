import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM003CComponent } from './pm003-c.component';

describe('PM003CComponent', () => {
  let component: PM003CComponent;
  let fixture: ComponentFixture<PM003CComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM003CComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM003CComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
