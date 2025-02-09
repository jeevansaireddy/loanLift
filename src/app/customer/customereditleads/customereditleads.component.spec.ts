import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomereditleadsComponent } from './customereditleads.component';

describe('CustomereditleadsComponent', () => {
  let component: CustomereditleadsComponent;
  let fixture: ComponentFixture<CustomereditleadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomereditleadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomereditleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
