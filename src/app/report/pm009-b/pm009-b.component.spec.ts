import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM009BComponent } from './pm009-b.component';

describe('PM009BComponent', () => {
  let component: PM009BComponent;
  let fixture: ComponentFixture<PM009BComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM009BComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM009BComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
