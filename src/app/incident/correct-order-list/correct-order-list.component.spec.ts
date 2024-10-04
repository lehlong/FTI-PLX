import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectOrderListComponent } from './correct-order-list.component';

describe('CorrectOrderListComponent', () => {
  let component: CorrectOrderListComponent;
  let fixture: ComponentFixture<CorrectOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrectOrderListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorrectOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
