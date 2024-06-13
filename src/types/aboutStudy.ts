import { User } from "./User";

export interface Study {
  study_id: number;
  title: string;
  createAt: Date;
  image: File | null;
  host: User | null;
  code: string;
}

export interface Category {
  category_id: number;
  title: string;
  study_id: number;
}
