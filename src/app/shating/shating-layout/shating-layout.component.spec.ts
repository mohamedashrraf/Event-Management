import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShatingLayoutComponent } from './shating-layout.component';

describe('ShatingLayoutComponent', () => {
  let component: ShatingLayoutComponent;
  let fixture: ComponentFixture<ShatingLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShatingLayoutComponent]
    });
    fixture = TestBed.createComponent(ShatingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
