import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PM003DComponent } from './pm003-d.component';

describe('PM003DComponent', () => {
  let component: PM003DComponent;
  let fixture: ComponentFixture<PM003DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PM003DComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PM003DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
