import { SetStateAction } from "react";
import { Category } from "./aboutStudy";

export interface TaskListData {
  category_id: number;
  subjectName: string;
  subjectNumber: number;
  timeLimit: number;
  memorySize: number;
  submit: number;
  answer: number;
  // person: number;
  answerRate: number;
  language: string;
  solveTime: string;
  codes: string;
}

// title =
// explanation =
// restrictions =
// memorySize =
// timeLimit =
// submit = 0;
// answer = 0;
// answerRate = 0.0;

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
  fullCatagoryList: Category[];
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
