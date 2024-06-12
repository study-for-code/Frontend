import { User } from "./User";

export interface Study {
  study_id: Number;
  title: string;
  createAt: Date;
  image: File | null;
  host: User | null;
  code: string;
}
