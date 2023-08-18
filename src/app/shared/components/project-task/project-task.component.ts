import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { project } from 'src/app/config/config.types';
import { ProjectTaskService } from './project-task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.css'],
})
export class ProjectTaskComponent implements OnInit, OnDestroy {
  projectId: string;
  projectDetails: project;
  projectDetailsSubscription: Subscription;
  navChoise:string = 'overview'
  constructor(private route: ActivatedRoute, private pt: ProjectTaskService) {}
  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId') as string;
    this.projectDetailsSubscription = this.pt
      .getProjectDetails(this.projectId)
      .subscribe(
        (data: project) => {
          this.projectDetails = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  handleNavSelect(choise:string){
    this.navChoise = choise
  }

  ngOnDestroy(): void {
    if (this.projectDetailsSubscription) {
      this.projectDetailsSubscription.unsubscribe();
    }
  }
}
