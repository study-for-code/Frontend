export interface Study {
  studyId: number;
  title: string;
  ownerId: number;
  createAt: Date;
  joinCode: string;
  // image: File | null;
  // host: User | null;
  // code: string;
}

export interface Category {
  categoryId: number;
  title: string;
}
