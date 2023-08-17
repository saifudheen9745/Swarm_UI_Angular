import { Component, Input } from '@angular/core';
import { project, workspace } from 'src/app/config/config.types';

@Component({
  selector: 'app-workspace-data-listing',
  templateUrl: './workspace-data-listing.component.html',
  styleUrls: ['./workspace-data-listing.component.css']
})
export class WorkspaceDataListingComponent {
  @Input() heading:string
  @Input() projects:project[]
  @Input() workspace:workspace
}
