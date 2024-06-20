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
  explanation: string; // 문제 내용
  restrictions: string[]; // 제한 사항
  timeLimit: number; // 시간 제한
  memorySize: number; // 메모리 제한
}

export interface testCaseType {
  input: string;
  output: string;
}

export interface limitationType {
  restrictions: string;
}

export interface createProblemType {
  title: string;
  timeLimit: number;
  memorySize: number;
  testCase: testCaseType[];
  explanation: string;
}

export interface getTestCaseType {
  input: string;
  output: string;
  testcaseId: number;
}
