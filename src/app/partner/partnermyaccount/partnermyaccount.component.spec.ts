import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnermyaccountComponent } from './partnermyaccount.component';

describe('PartnermyaccountComponent', () => {
  let component: PartnermyaccountComponent;
  let fixture: ComponentFixture<PartnermyaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnermyaccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnermyaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
