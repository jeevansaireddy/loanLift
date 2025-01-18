import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddleadsComponent } from './addleads.component';

describe('AddleadsComponent', () => {
  let component: AddleadsComponent;
  let fixture: ComponentFixture<AddleadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddleadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
