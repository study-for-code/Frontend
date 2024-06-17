export interface AdminComponentType {
  [key: string]: React.ReactNode;
  createProblems: React.ReactElement;
  manageProblems: React.ReactElement;
  userWithdrawal: React.ReactElement;
}

export interface problemListType {
  subjectName: string;
  subjectNumber: number; // 문제 번호
  algorithmType: string; // 알고리즘 종류
  problemDescription: string;
  timeLimit: number; //  시간 제한
  memorySize: number; // 메모리 사이즈
  answerRate: number; // 정답 비율
  solveTime: string; // 풀이 시간
}

export interface testCaseType {
  input: string;
  output: string;
}

export interface limitationType {
  limitation: string;
}

export interface createProblemType {
  problemName: string;
  timeLimit: number;
  submitAnswer: number;
  memoryLimit: number;
  answer: number;
  answerRate: string;
  testCases: testCaseType[];
  inputProblem: string;
  limitations: string[];
}
