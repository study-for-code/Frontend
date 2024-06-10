export interface CategoryListData {
  listName: string;
  subjectName: string;
  subjectNumber: number;
  timeLimit: number;
  memorySize: number;
  submit: number;
  answer: number;
  person: number;
  answerRate: number;
  language: string;
  solveTime: string;
  codes: string;
}

export interface ComponentMap {
  codeReview: React.ReactElement;
  algorithmList: React.ReactElement;
  defaultPage: React.ReactElement;
}

export type PageKey = keyof ComponentMap;
