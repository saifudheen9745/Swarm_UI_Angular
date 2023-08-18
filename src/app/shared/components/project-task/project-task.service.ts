import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { project, task } from 'src/app/config/config.types';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectTaskService {

  constructor(private http:HttpClient) { }

  getProjectDetails(projectId:string):Observable<project>{
    return this.http.get<project>(`${environment.baseUrl}/project/details/${projectId}`);
  }

  getProjectTasks(projectId:string):Observable<task[]>{
    return this.http.get<task[]>(`${environment.baseUrl}/task/${projectId}`)
  }
}
