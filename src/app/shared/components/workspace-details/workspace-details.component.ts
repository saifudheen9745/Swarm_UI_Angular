import { Component, Input } from '@angular/core';
import { project, workspace } from 'src/app/config/config.types';
import { WorkspaceService } from '../workspace/workspace.service';

@Component({
  selector: 'app-workspace-details',
  templateUrl: './workspace-details.component.html',
  styleUrls: ['./workspace-details.component.css'],
})
export class WorkspaceDetailsComponent {
  @Input() workspaceDetails: workspace;
  @Input() projectDetails: project[];
  constructor(private ws: WorkspaceService) {}

  goToWorkspaceSelect = (): void => {
    this.ws.updateWorkspaceClicked();
  };
}
