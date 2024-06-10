import { SetStateAction } from "react";

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
  defaultPage: React.ReactElement | null;
}

export type PageKey = keyof ComponentMap;

export interface CategoryListMap {
  [listName: string]: CategoryListData[];
}

export interface useHandleToggleType {
  isToggleSelected: boolean[];
  setIsToggleSelected: React.Dispatch<SetStateAction<boolean[]>>;
  problemList: string[];
  idx: number;
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
