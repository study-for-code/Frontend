type Role = "ADMIN" | "MEMBER";

export interface User {
  email: string;
  memberId: number;
  nickname: string;
  role: Role;
}
