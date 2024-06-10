import { taskList } from "@/constants/TaskList";
import { http, HttpResponse } from "msw";

export const handlers = [
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
