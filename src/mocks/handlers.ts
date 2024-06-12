import { fullStudyList, studyList } from "@/constants/StudyList";
import { taskList } from "@/constants/TaskList";
import { userData } from "@/constants/UserData";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/user", () => {
    return HttpResponse.json(userData);
  }),
  http.get("/studyList", () => {
    return HttpResponse.json(studyList);
  }),
  http.get("/fullStudyList", () => {
    return HttpResponse.json(fullStudyList);
  }),
  http.get("/categoryList", () => {
    return HttpResponse.json(taskList);
  }),
  http.get("/todos", () => {
    return HttpResponse.json({
      id: "todos",
      title: "i am a boy",
    });
  }),
];
