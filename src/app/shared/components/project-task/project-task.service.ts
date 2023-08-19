import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { project, projectMembers, task } from 'src/app/config/config.types';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectTaskService {
 
  activateModal = new BehaviorSubject<boolean>(false);
  projectCompletionRate = new BehaviorSubject<number>(0)

  constructor(private http:HttpClient) { }

 

  updateProjectCompletionRate(data:number):void{
    this.projectCompletionRate.next(data)
  }

  updateActivateModal():void{
    this.activateModal.next(!this.activateModal.getValue())
  }

  getProjectDetails(projectId:string):Observable<project>{
    return this.http.get<project>(`${environment.baseUrl}/project/details/${projectId}`);
  }

  getProjectTasks(projectId:string):Observable<task[]>{
    return this.http.get<task[]>(`${environment.baseUrl}/task/${projectId}`)
  }

  getDetailsOfATask(taskId:string):Observable<task>{
    return this.http.get<task>(`${environment.baseUrl}/task/comments/${taskId}`)
  }

  addComment(commentDetails:{name:string,userId:string,taskId:string,comment:string}):Observable<{updated:boolean}>{
    return this.http.post<{ updated: boolean }>(
      `${environment.baseUrl}/task/addcomments`,commentDetails
    );
  }

  deleteTask(taskId:string):Observable<{deleted:true}>{
    return this.http.delete<{ deleted: true }>(
      `${environment.baseUrl}/task/${taskId}`
    );
  }

  updateTaskStatus(userId:string,taskId:string,status:string):Observable<{updated:boolean}>{
    return this.http.patch<{ updated: boolean }>(
      `${environment.baseUrl}/task/updatestatus`,
      { userId, taskId, status }
    );
  }

  getRegisteredProjectMembers(projectId:string):Observable<projectMembers>{
    return this.http.get<projectMembers>(`${environment.baseUrl}/project/members/${projectId}`);
  }

  createTask(details:task){
    return this.http.post(`${environment.baseUrl}/task/create`,details)
  }
}
