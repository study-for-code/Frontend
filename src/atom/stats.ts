import { User } from "@/types/User";
import { TaskListData } from "@/types/aboutHome";
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

export const selectedStudyState = atom<Study>({
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
