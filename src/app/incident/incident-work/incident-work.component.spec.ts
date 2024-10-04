import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentWorkComponent } from './incident-work.component';

describe('IncidentWorkComponent', () => {
  let component: IncidentWorkComponent;
  let fixture: ComponentFixture<IncidentWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentWorkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncidentWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
