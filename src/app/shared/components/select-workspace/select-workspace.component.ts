import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { workspace, workspaces } from 'src/app/config/config.types';

@Component({
  selector: 'app-select-workspace',
  templateUrl: './select-workspace.component.html',
  styleUrls: ['./select-workspace.component.css'],
})
export class SelectWorkspaceComponent {
  @Input() workspaces:workspaces
  @Output() emitSelectedWsId:EventEmitter<string> = new EventEmitter()
  
  sharedWorksace:workspace
  ownedWorkspace:workspace
  
  selectedTab: string = 'owned';
 
  changeTab(tab: string) {
    this.selectedTab = tab;
  }

  selectWorkspace(workspaceId:string){
    this.emitSelectedWsId.emit(workspaceId)
  }
}
