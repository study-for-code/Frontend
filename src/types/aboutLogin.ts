export interface LoginType {
  email: string;
  password: string;
  code: number;
}

export interface LoginResponseType {
  email: string;
  memberId: string;
  nickname: string;
  token: string;
}
