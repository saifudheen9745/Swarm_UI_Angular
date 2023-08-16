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
  members: [];
  name: string;
  projects: [];
  theme: string;
  __v: number;
  _id: string;
}

export interface workspaces {
  ownedWorkspaces:[],
  sharedWorkspaces:[]
}

export interface project {
  workspace:string,
  name:string,
  description:string,
  theme:string,
  from:string,
  to:string,
  members:[]
}
