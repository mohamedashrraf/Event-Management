import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShatingComponent } from './shating.component';

describe('ShatingComponent', () => {
  let component: ShatingComponent;
  let fixture: ComponentFixture<ShatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShatingComponent]
    });
    fixture = TestBed.createComponent(ShatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
