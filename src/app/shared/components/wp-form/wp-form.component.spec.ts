import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WpFormComponent } from './wp-form.component';

describe('WpFormComponent', () => {
  let component: WpFormComponent;
  let fixture: ComponentFixture<WpFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WpFormComponent]
    });
    fixture = TestBed.createComponent(WpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
