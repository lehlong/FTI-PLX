import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM003BComponent } from './pm003-b.component';

describe('PM003BComponent', () => {
  let component: PM003BComponent;
  let fixture: ComponentFixture<PM003BComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM003BComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM003BComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
