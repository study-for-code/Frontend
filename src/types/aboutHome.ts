import { SetStateAction } from "react";
import { Category } from "./aboutStudy";

export interface TaskListData {
  algorithmId: number;
  algorithmTitle: string;
  timeLimit: number;
  memorySize: number;
  submit: number;
  answer: number;
  answerRate: number;
  language: string;
  codes: string;
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
  algorithmDescription: React.ReactElement;
  codeIde: React.ReactElement;
  defaultPage: React.ReactElement | null;
}

export type PageKey = keyof ComponentMap;

export interface CategoryListMap {
  [listName: string]: CategoryListData[];
}

export interface useHandleToggleType {
  isToggleSelected: boolean[];
  setIsToggleSelected: React.Dispatch<SetStateAction<boolean[]>>;
  categoryList: SpecificCategoryData[];
  category_id: number;
}

export interface useGetCategoryDataType {
  setProblemList: React.Dispatch<React.SetStateAction<string[]>>;
  setCategoryList: React.Dispatch<React.SetStateAction<CategoryListMap>>;
}

export interface ContentSectionType {
  page: keyof ComponentMap;
  componentToShow: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > | null;
}

export interface AlgorithmListType {
  algorithmId: number;
  algorithmTitle: string;
  solvedMembers: string[];
  SubscribeStatus: boolean;
}
export interface SpecificCategoryData {
  categoryId: number;
  subscribes: subscribesType[];
  title: string;
}
interface subscribesType {
  algorithm: algorithmType;
  subscribeId: number;
}

interface algorithmType {
  algorithmId: number;
  algorithmTitle: string;
}

export interface categoryToggleListType {
  algorithm: {
    algorithmId: number;
    algorithmTitle: string;
  };
  subscribeId: number;
}
