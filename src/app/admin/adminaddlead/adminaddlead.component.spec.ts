import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddleadComponent } from './adminaddlead.component';

describe('AdminaddleadComponent', () => {
  let component: AdminaddleadComponent;
  let fixture: ComponentFixture<AdminaddleadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminaddleadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminaddleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
