import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceListingComponent } from './workspace-listing.component';

describe('WorkspaceListingComponent', () => {
  let component: WorkspaceListingComponent;
  let fixture: ComponentFixture<WorkspaceListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspaceListingComponent]
    });
    fixture = TestBed.createComponent(WorkspaceListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
