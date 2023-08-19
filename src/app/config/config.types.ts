export interface userRegisterDetals {
  fname: string | null;
  email: string | null;
  mobile: string | null;
  password: string | null;
  cnfpassword: string | null;
}

export interface dataFromGoogle {
  fname: string;
  email: string;
}

export interface loginResponseData {
  accessToken: string;
  userId: string;
  name: string;
  email: string;
}

export interface loginResponsePostConfirmation {
  accessToken: string;
  userId: string;
  name: string;
  email: string;
  verified: boolean;
}

export interface userAccountDetails {
  fname: string;
  email: string;
  mobile?: string;
  userId: string;
}

export interface workspace {
  master: string;
  members: [{ email: string; status: string }];
  name: string;
  projects: [];
  theme: string;
  __v: number;
  _id: string;
}

export interface workspaces {
  ownedWorkspaces: [workspace];
  sharedWorkspaces: [workspace];
}

export interface project {
  _id: string;
  workspace: string;
  name: string;
  description: string;
  theme: string;
  from: string;
  to: string;
  members: [];
}

export interface task {
  name: string;
  priority: string;
  description: string;
  from: string;
  to: string;
  images: [];
  assignee: [];
  reporter: string;
  projectId: string;
  comments: [];
  status: string;
}

export interface task {
  _id: string;
  name: string;
  priority: string;
  description: string;
  from: string;
  to: string;
  images: [];
  assignee: [];
  reporter: string;
  projectId: string;
  member?: [{ fname: string; _id: string; email: string }];
}

export interface comment {
  comment: string
  createdAt: string
  createdBy: string
  creatorName: string
}

export interface projectMembers {
  member: [string];
  registerdMembers: [{ name: string; email: string; _id: string }];
}