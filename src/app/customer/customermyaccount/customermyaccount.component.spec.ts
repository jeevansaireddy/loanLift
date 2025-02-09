import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomermyaccountComponent } from './customermyaccount.component';

describe('CustomermyaccountComponent', () => {
  let component: CustomermyaccountComponent;
  let fixture: ComponentFixture<CustomermyaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomermyaccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomermyaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
