import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM006EComponent } from './pm006-e.component';

describe('PM006EComponent', () => {
  let component: PM006EComponent;
  let fixture: ComponentFixture<PM006EComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM006EComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM006EComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
