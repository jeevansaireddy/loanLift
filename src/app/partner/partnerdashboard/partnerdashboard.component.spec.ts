import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerdashboardComponent } from './partnerdashboard.component';

describe('PartnerdashboardComponent', () => {
  let component: PartnerdashboardComponent;
  let fixture: ComponentFixture<PartnerdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerdashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
