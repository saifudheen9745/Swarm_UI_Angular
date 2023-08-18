import { Component, Input, OnInit } from '@angular/core';
import { ProjectTaskService } from '../project-task/project-task.service';
import { task } from 'src/app/config/config.types';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  @Input() projectId:string
  constructor(private pt:ProjectTaskService){}
  ngOnInit(): void {
      this.pt.getProjectTasks(this.projectId).subscribe((data:task[])=>{
        console.log(data);
        
      },(error)=>{
        console.log(error);
        
      })
  }
}
