import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM012BComponent } from './pm012-b.component';

describe('PM012BComponent', () => {
  let component: PM012BComponent;
  let fixture: ComponentFixture<PM012BComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM012BComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM012BComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
