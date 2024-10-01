import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentlogsComponent } from './incidentlogs.component';

describe('IncidentlogsComponent', () => {
  let component: IncidentlogsComponent;
  let fixture: ComponentFixture<IncidentlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentlogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncidentlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
