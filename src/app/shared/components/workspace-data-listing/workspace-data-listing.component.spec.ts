import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceDataListingComponent } from './workspace-data-listing.component';

describe('WorkspaceDataListingComponent', () => {
  let component: WorkspaceDataListingComponent;
  let fixture: ComponentFixture<WorkspaceDataListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspaceDataListingComponent]
    });
    fixture = TestBed.createComponent(WorkspaceDataListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
