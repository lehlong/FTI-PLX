import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentWorkApprovalComponent } from './incident-work-approval.component';

describe('IncidentWorkApprovalComponent', () => {
  let component: IncidentWorkApprovalComponent;
  let fixture: ComponentFixture<IncidentWorkApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentWorkApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncidentWorkApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
