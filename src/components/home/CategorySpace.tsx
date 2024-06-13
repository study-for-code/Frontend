import CategoryExpansion from "@/assets/home/category_expansion.png";
import CategoryExpansion2 from "@/assets/home/category_expansion2.png";
import { TaskListData } from "@/types/aboutHome";
import { useRecoilValue } from "recoil";
import { taskListState } from "@/atom/stats";
import { Category } from "@/types/aboutStudy";

interface CategorySpaceProps {
  categoryList: Category[];
  isToggleSelected: boolean[];
  handleToggle: (category_id: number) => void;
  handlePage: (data: TaskListData) => void;
}

const CategorySpace: React.FC<CategorySpaceProps> = ({
  categoryList,
  isToggleSelected,
  handleToggle,
  handlePage,
}) => {
  const taskList = useRecoilValue(taskListState);

  console.log("task list: ", taskList);
  console.log("category ID : ", categoryList);
  console.log("isToggleSelected: ", isToggleSelected);

  return (
    <div className="categorySpace">
      <div className="algorithmList">Task 목록</div>
      {categoryList.map((category) => {
        // category_id와 일치하는 task들을 필터링
        const filteredTasks = taskList.filter(
          (task) => task.category_id === category.category_id
        );

        return (
          <div className="categoryRow" key={category.category_id}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "0.5rem" }}>{category.title}</span>
              <span>-----------</span>
              <img
                style={{ marginLeft: "0.5rem" }}
                title={`${category.title}}`}
                src={
                  isToggleSelected[category.category_id]
                    ? CategoryExpansion
                    : CategoryExpansion2
                }
                onClick={() => handleToggle(category.category_id)}
              />
            </div>
            {isToggleSelected[category.category_id] &&
              filteredTasks.map((task, index: number) => (
                <div key={index} className="algorithmProblems">
                  <li
                    style={{ padding: "0.3rem" }}
                    onClick={() => handlePage(task)}
                  >
                    {task.subjectNumber} {task.subjectName}
                  </li>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default CategorySpace;
