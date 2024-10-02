import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM004CComponent } from './pm004-c.component';

describe('PM004CComponent', () => {
  let component: PM004CComponent;
  let fixture: ComponentFixture<PM004CComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM004CComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM004CComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
