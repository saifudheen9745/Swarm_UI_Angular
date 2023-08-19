import { Component, Input} from '@angular/core';
import { project } from 'src/app/config/config.types';
import { ProjectTaskService } from '../project-task/project-task.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css'],
})
export class ProjectOverviewComponent  {
  @Input() project: project;
  
  constructor(public pt:ProjectTaskService){}
 
}
