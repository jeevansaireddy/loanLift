import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerleadsComponent } from './customerleads.component';

describe('CustomerleadsComponent', () => {
  let component: CustomerleadsComponent;
  let fixture: ComponentFixture<CustomerleadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerleadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
