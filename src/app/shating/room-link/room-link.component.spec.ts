import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomLinkComponent } from './room-link.component';

describe('RoomLinkComponent', () => {
  let component: RoomLinkComponent;
  let fixture: ComponentFixture<RoomLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomLinkComponent]
    });
    fixture = TestBed.createComponent(RoomLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
