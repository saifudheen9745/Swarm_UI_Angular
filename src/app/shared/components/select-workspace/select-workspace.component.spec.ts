import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWorkspaceComponent } from './select-workspace.component';

describe('SelectWorkspaceComponent', () => {
  let component: SelectWorkspaceComponent;
  let fixture: ComponentFixture<SelectWorkspaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectWorkspaceComponent]
    });
    fixture = TestBed.createComponent(SelectWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
