import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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

import { OptionsContainer } from "@/styles/home/homeStyles";

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
  const [showOptions, setShowOptions] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  console.log("task list: ", taskList);
  console.log("category ID : ", categoryList);
  console.log("isToggleSelected: ", isToggleSelected);

  const handleCreateModal = () => {
    setShowOptions(false);
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setShowOptions(true);
  };

  const handleAddCategory = (newCategory: Category) => {
    setFullCategoryList((prevCategory) => [...prevCategory, newCategory]);
    setCgList((prevCg) => [...prevCg, newCategory]);
  };

  console.log("full Category : ", fullCatagoryList);

  const modalRoot = document.querySelector("#modal-container");
  if (!modalRoot) return null;

  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (showOptions && container) {
  //     document.body.appendChild(container);
  //     container.style.position = "absolute";
  //     container.style.left = `${menuPosition.x}px`;
  //     container.style.top = `${menuPosition.y}px`;
  //     container.style.zIndex = "1000";
  //   }

  //   return () => {
  //     if (container && document.body.contains(container)) {
  //       document.body.removeChild(container);
  //     }
  //   };
  // }, [showOptions, menuPosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return (
    <div className="drawerContent" onContextMenu={handleContextMenu}>
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

        {showOptions &&
          createPortal(
            <OptionsContainer
              ref={containerRef}
              style={{
                position: "fixed",
                top: menuPosition.y,
                left: menuPosition.x,
              }}
            >
              {user &&
                selectedStudy &&
                selectedStudy.host &&
                user.email === selectedStudy.host.email && (
                  <button className="optionButton" onClick={handleCreateModal}>
                    카테고리 생성
                  </button>
                )}
              <button className="optionButton">문제 검색</button>
            </OptionsContainer>,
            modalRoot
          )}

        <CreateCategoryModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModal}
          onSubmit={handleAddCategory}
          selectedStudy={selectedStudy}
        />
      </div>
    </div>
  );
};

export default CategorySpace;
