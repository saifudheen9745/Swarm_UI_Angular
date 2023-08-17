import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { workspace } from 'src/app/config/config.types';
import { WorkspaceService } from '../workspace/workspace.service';

@Component({
  selector: 'app-workspace-listing',
  templateUrl: './workspace-listing.component.html',
  styleUrls: ['./workspace-listing.component.css'],
})
export class WorkspaceListingComponent {
  @Input() workspace: workspace[];
  @Output() emitWsId: EventEmitter<string> = new EventEmitter();
  constructor(private wS: WorkspaceService) {}
  selectWorkspace(workspaceId: string) {
    this.emitWsId.emit(workspaceId);
    this.wS.updateWorkspaceClicked();
  }
}
