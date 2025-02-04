import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmyaccountComponent } from './adminmyaccount.component';

describe('AdminmyaccountComponent', () => {
  let component: AdminmyaccountComponent;
  let fixture: ComponentFixture<AdminmyaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminmyaccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminmyaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
