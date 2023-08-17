import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { workspace, workspaces } from 'src/app/config/config.types';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  workspaceClicked = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}
  getWorkspaceClickedValue = (): boolean => {
    return this.workspaceClicked.getValue();
  };
  updateWorkspaceClicked = () => {
    this.workspaceClicked.next(!this.workspaceClicked.getValue());
  };
  updateWorkspaceClickedReset = () => {
    this.workspaceClicked.next(false);
  }

  //To get both owned and shared workspace of a user
  getAllWorkspaces = (
    userId: string,
    email: string
  ): Observable<workspaces> => {
    return this.http.post<workspaces>(`${environment.baseUrl}/workspace`, {
      userId,
      email,
    });
  };

  //To select workspace to work
  selectWorkspace = (workspaceId: string): Observable<workspace> => {
    return this.http.get<workspace>(
      `${environment.baseUrl}/workspace/selectedone/${workspaceId}`
    );
  };

  getProjectsOfSelectedWorkspace = (workspaceId: string) => {
    return this.http.get<workspace>(
      `${environment.baseUrl}/project/${workspaceId}`
    );
  };
}
