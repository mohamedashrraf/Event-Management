import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShatingMessageComponent } from './shating-message.component';

describe('ShatingMessageComponent', () => {
  let component: ShatingMessageComponent;
  let fixture: ComponentFixture<ShatingMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShatingMessageComponent]
    });
    fixture = TestBed.createComponent(ShatingMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
