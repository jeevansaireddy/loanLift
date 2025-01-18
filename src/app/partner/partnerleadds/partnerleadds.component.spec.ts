import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerleaddsComponent } from './partnerleadds.component';

describe('PartnerleaddsComponent', () => {
  let component: PartnerleaddsComponent;
  let fixture: ComponentFixture<PartnerleaddsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerleaddsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerleaddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
