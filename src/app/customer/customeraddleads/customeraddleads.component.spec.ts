import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeraddleadsComponent } from './customeraddleads.component';

describe('CustomeraddleadsComponent', () => {
  let component: CustomeraddleadsComponent;
  let fixture: ComponentFixture<CustomeraddleadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomeraddleadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomeraddleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
