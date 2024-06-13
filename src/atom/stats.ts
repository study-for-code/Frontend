import { User } from "@/types/User";
import { TaskListData } from "@/types/aboutHome";
import { Category, Study } from "@/types/aboutStudy";
import { atom } from "recoil";

export const userState = atom<User>({
  key: "userState",
  default: {
    email: "",
    nickname: "",
    grade: "MEMBER",
  },
});

export const studiesState = atom<Study[]>({
  key: "studiesState",
  default: [],
});

export const selectedStudyState = atom<Study | null>({
  key: "selectedStudyState",
  default: null,
});

export const fullStudiesState = atom<Study[]>({
  key: "fullStudiesState",
  default: [],
});

export const cgListState = atom<Category[]>({
  key: "cgListState",
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
