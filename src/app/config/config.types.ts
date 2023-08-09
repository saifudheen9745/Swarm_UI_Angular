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
    accessToken:string,
    userId:string,
    name:string,
    email:string
}