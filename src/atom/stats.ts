import { User } from "@/types/User";
import { problemListType, testCaseType } from "@/types/aboutAdmin";
import { PageKey, TaskListData } from "@/types/aboutHome";
import { Category, Study } from "@/types/aboutStudy";
import { atom } from "recoil";

export const userState = atom<User>({
  key: "userState",
  default: {
    memberId: 0,
    email: "",
    nickname: "",
    role: "MEMBER",
  },
});

export const studiesState = atom<Study[]>({
  key: "studiesState",
  default: [],
});

export const selectedStudyState = atom<Study | null>({
  key: "selectedStudyState",
  default: {
    studyId: 0,
    title: "",
    ownerId: 0,
    createAt: new Date(),
    joinCode: "",
  },
});

export const categoryListState = atom<Category[]>({
  key: "categoryListState",
  default: [],
});

export const fullCategoryListState = atom<Category[]>({
  key: "fullCategoryListState",
  default: [],
});

export const taskListState = atom<TaskListData[]>({
  key: "taskListState",
  default: [],
});

export const pageState = atom<PageKey>({
  key: "pageState",
  default: "defaultPage",
});

export const pageDataState = atom<problemListType>({
  key: "pageDataState",
  default: {
    algorithmId: 0,
    algorithmTitle: "",
    submit: 0, // 제출된 정답의 개수
    answer: 0, // 맞은 정답의 개수
    answerRate: 0, // 정답 비율
    content: "", // 문제 내용
    restrictions: [], // 제한 사항
    timeLimit: 0, // 시간 제한
  },
});

export const testDataState = atom<testCaseType[]>({
  key: "testDataState",
  default: [],
});

export const userSectionState = atom<boolean>({
  key: "userSectionState",
  default: false,
});
