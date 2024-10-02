import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM006DComponent } from './pm006-d.component';

describe('PM006DComponent', () => {
  let component: PM006DComponent;
  let fixture: ComponentFixture<PM006DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM006DComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM006DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
