export interface ImageData {
  imageFileUrl: string;
  imageId: number;
}

export interface Study {
  studyId: number;
  title: string;
  ownerId: number;
  createAt: Date;
  joinCode: string;
  image: ImageData | null;
  // host: User | null;
  // code: string;
}

export interface Category {
  categoryId: number;
  title: string;
  subscribes: string[];
}

export interface TestResult {
  actualResult: string;
  status: string;
  testNum: number;
  executionTime: number;
  usedMemory: number;
}

export interface Result {
  answerType: string;
  language: string;
  results: TestResult[];
  solveMemory: number;
  solveTime: number;
}
