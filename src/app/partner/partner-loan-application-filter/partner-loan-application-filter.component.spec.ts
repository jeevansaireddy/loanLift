import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerLoanApplicationFilterComponent } from './partner-loan-application-filter.component';

describe('PartnerLoanApplicationFilterComponent', () => {
  let component: PartnerLoanApplicationFilterComponent;
  let fixture: ComponentFixture<PartnerLoanApplicationFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerLoanApplicationFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerLoanApplicationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
