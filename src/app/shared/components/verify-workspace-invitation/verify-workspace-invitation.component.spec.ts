import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyWorkspaceInvitationComponent } from './verify-workspace-invitation.component';

describe('VerifyWorkspaceInvitationComponent', () => {
  let component: VerifyWorkspaceInvitationComponent;
  let fixture: ComponentFixture<VerifyWorkspaceInvitationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyWorkspaceInvitationComponent]
    });
    fixture = TestBed.createComponent(VerifyWorkspaceInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
