export interface AdminComponentType {
  [key: string]: React.ReactNode;
  createProblems: React.ReactElement;
  manageProblems: React.ReactElement;
  userWithdrawal: React.ReactElement;
}

export interface problemListType {
  algorithmId: number;
  algorithmTitle: string;
  submit: number; // 제출된 정답의 개수
  answer: number; // 맞은 정답의 개수
  answerRate: number; // 정답 비율
  content: string; // 문제 내용
}

export interface testCaseType {
  input: string;
  output: string;
}

export interface limitationType {
  limitation: string;
}

export interface createProblemType {
  title: string;
  timeLimit: number;
  submit: number;
  memoryLimit: number;
  answer: number;
  answerRate: string;
  testCase: testCaseType[];
  explanation: string;
  limitations: string[];
}
