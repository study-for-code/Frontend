import { useState } from "react";

// image
import CategoryExpansion from "@/assets/home/category_expansion.png";
import CategoryExpansion2 from "@/assets/home/category_expansion2.png";
import Plus from "@/assets/home/plus_gray.png";

// type
import { TaskListData } from "@/types/aboutHome";
import { Category } from "@/types/aboutStudy";

// component
import CreateCategoryModal from "../modal/CreateCategoryModal";

// atom
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  cgListState,
  fullCategoryListState,
  selectedStudyState,
  taskListState,
  userState,
} from "@/atom/stats";

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
  const user = useRecoilValue(userState);
  const taskList = useRecoilValue(taskListState);
  const [fullCatagoryList, setFullCategoryList] = useRecoilState(
    fullCategoryListState
  );
  const setCgList = useSetRecoilState(cgListState);
  const selectedStudy = useRecoilValue(selectedStudyState);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  console.log("task list: ", taskList);
  console.log("category ID : ", categoryList);
  console.log("isToggleSelected: ", isToggleSelected);

  const handleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const handleAddCategory = (newCategory: Category) => {
    setFullCategoryList((prevCategory) => [...prevCategory, newCategory]);
    setCgList((prevCg) => [...prevCg, newCategory]);
  };

  console.log("full Category : ", fullCatagoryList);

  return (
    <div className="categorySpace">
      <div className="algorithmList">
        <img src={Plus} style={{ visibility: "hidden" }} />
        Task 목록
        {user &&
        selectedStudy &&
        selectedStudy.host &&
        user.email === selectedStudy.host.email ? (
          <img src={Plus} className="plusBtn" onClick={handleCreateModal} />
        ) : (
          <img src={Plus} style={{ visibility: "hidden" }} />
        )}
      </div>
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

      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModal}
        onSubmit={handleAddCategory}
        selectedStudy={selectedStudy}
      />
    </div>
  );
};

export default CategorySpace;
