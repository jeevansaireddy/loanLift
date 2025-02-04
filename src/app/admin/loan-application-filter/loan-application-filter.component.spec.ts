import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApplicationFilterComponent } from './loan-application-filter.component';

describe('LoanApplicationFilterComponent', () => {
  let component: LoanApplicationFilterComponent;
  let fixture: ComponentFixture<LoanApplicationFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanApplicationFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanApplicationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
