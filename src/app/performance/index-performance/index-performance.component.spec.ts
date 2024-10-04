import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPerformanceComponent } from './index-performance.component';

describe('IndexPerformanceComponent', () => {
  let component: IndexPerformanceComponent;
  let fixture: ComponentFixture<IndexPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexPerformanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
