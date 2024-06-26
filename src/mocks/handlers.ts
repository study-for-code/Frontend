import { categoryList } from "@/constants/CategoryList";
import { studyList } from "@/constants/StudyList";
import { taskList } from "@/constants/TaskList";
import { userData } from "@/constants/UserData";
import { problemList } from "@/constants/problemList";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/user", () => {
    return HttpResponse.json(userData);
  }),
  http.get("/studyList", () => {
    return HttpResponse.json(studyList);
  }),
  http.get("/categoryList", () => {
    return HttpResponse.json(categoryList);
  }),
  http.get("/taskList", () => {
    return HttpResponse.json(taskList);
  }),
  http.get("/problemList", () => {
    return HttpResponse.json(problemList);
  }),
  http.get("/todos", () => {
    return HttpResponse.json({
      id: "todos",
      title: "i am a boy",
    });
  }),
];
