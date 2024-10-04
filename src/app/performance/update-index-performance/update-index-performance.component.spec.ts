import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIndexPerformanceComponent } from './update-index-performance.component';

describe('UpdateIndexPerformanceComponent', () => {
  let component: UpdateIndexPerformanceComponent;
  let fixture: ComponentFixture<UpdateIndexPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateIndexPerformanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateIndexPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
