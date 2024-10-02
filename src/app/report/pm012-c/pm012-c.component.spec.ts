import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM012CComponent } from './pm012-c.component';

describe('PM012CComponent', () => {
  let component: PM012CComponent;
  let fixture: ComponentFixture<PM012CComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM012CComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM012CComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
