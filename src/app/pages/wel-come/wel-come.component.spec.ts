import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelComeComponent } from './wel-come.component';

describe('WelComeComponent', () => {
  let component: WelComeComponent;
  let fixture: ComponentFixture<WelComeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelComeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelComeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
