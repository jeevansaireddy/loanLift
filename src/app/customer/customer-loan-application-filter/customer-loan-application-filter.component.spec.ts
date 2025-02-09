import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLoanApplicationFilterComponent } from './customer-loan-application-filter.component';

describe('CustomerLoanApplicationFilterComponent', () => {
  let component: CustomerLoanApplicationFilterComponent;
  let fixture: ComponentFixture<CustomerLoanApplicationFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerLoanApplicationFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerLoanApplicationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
