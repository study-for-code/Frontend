import { User } from "@/types/User";
import { Study } from "@/types/aboutStudy";
import { atom } from "recoil";

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

export const studiesState = atom<Study[]>({
  key: "studiesState",
  default: [],
});

export const selectedStudyState = atom<Study | null>({
  key: "selectedStudyState",
  default: null,
});
