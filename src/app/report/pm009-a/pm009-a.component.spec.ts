import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM009AComponent } from './pm009-a.component';

describe('PM009AComponent', () => {
  let component: PM009AComponent;
  let fixture: ComponentFixture<PM009AComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM009AComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM009AComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
