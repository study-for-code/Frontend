export interface Study {
  studyId: number;
  title: string;
  ownerId: number;
  createAt: Date;
  // image: File | null;
  // host: User | null;
  // code: string;
}

export interface Category {
  category_id: number;
  title: string;
  study_id: number;
}
