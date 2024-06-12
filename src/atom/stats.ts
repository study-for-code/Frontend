import { User } from "@/types/User";
import { Study } from "@/types/aboutStudy";
import { atom } from "recoil";

export const userState = atom<User>({
  key: "userState",
  default: {
    email: "sfoco@gmail.com",
    nickname: "sfoco",
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
