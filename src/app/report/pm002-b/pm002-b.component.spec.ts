import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM002BComponent } from './pm002-b.component';

describe('PM002BComponent', () => {
  let component: PM002BComponent;
  let fixture: ComponentFixture<PM002BComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM002BComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM002BComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
