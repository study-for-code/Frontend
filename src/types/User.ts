type Grade = "ADMIN" | "MEMBER";

export interface User {
  email: string;
  nickname: string;
  grade: Grade;
}
