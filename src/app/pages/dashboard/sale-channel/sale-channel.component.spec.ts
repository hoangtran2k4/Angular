import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleChannelComponent } from './sale-channel.component';

describe('SaleChannelComponent', () => {
  let component: SaleChannelComponent;
  let fixture: ComponentFixture<SaleChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleChannelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
