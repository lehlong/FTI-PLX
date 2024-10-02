import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM002CComponent } from './pm002-c.component';

describe('PM002CComponent', () => {
  let component: PM002CComponent;
  let fixture: ComponentFixture<PM002CComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM002CComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM002CComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
