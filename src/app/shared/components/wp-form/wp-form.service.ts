import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { project, workspace, workspaces } from 'src/app/config/config.types';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class WpFormService {
  constructor(private http: HttpClient) {}

  createNewWorkspace = (workspaceDetails: {
    theme: string;
    name: string;
    master: string;
  }) => {
    return this.http.post<{ msg: string }>(
      `${environment.baseUrl}/workspace/create`,
      workspaceDetails
    );
  };

  getAllWorkspaces = (userId: string, email: string):Observable<workspaces> => {
    return this.http.post<workspaces>(`${environment.baseUrl}/workspace`, {
      userId,
      email,
    });
  };

  getMembersOfSelectedWorkspace = (workspaceId:string):Observable<workspace> => {
    return this.http.get<workspace>(
      `${environment.baseUrl}/workspace/selectedone/${workspaceId}`
    );
  };

  createProject = (projectDeatils:project) => {
    return this.http.post(`${environment.baseUrl}/project/create`,projectDeatils);
  };

  addMembersToWorkspace = (userEmails:string[], workspaceId:string) => {
    return this.http.post<{ sent: boolean }>(
      `${environment.baseUrl}/workspace/sentverifymail`,
      { userEmails, workspaceId }
    );
  };
}
