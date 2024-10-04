import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntergateIndexPerformanceComponent } from './intergate-index-performance.component';

describe('IntergateIndexPerformanceComponent', () => {
  let component: IntergateIndexPerformanceComponent;
  let fixture: ComponentFixture<IntergateIndexPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntergateIndexPerformanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntergateIndexPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
