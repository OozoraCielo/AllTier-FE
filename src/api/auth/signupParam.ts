export interface SignupParam {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface SignupResp {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  tokenVersion: number;
}