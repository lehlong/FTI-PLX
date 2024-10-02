import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM002AComponent } from './pm002-a.component';

describe('PM002AComponent', () => {
  let component: PM002AComponent;
  let fixture: ComponentFixture<PM002AComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM002AComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM002AComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
