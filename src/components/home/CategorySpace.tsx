import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";

// image
import CategoryExpansion from "@/assets/home/category_expansion.png";
import CategoryExpansion2 from "@/assets/home/category_expansion2.png";

// type
import { TaskListData } from "@/types/aboutHome";
import { Category } from "@/types/aboutStudy";

// component
import CreateCategoryModal from "../modal/CreateCategoryModal";

// atom
import { useRecoilValue, useRecoilState } from "recoil";
import {
  cgListState,
  fullCategoryListState,
  selectedStudyState,
  taskListState,
  userState,
} from "@/atom/stats";

import { OptionsContainer } from "@/styles/home/homeStyles";
import DeleteCategoryModal from "../modal/DeleteCategoryModal";

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
  const [cgList, setCgList] = useRecoilState(cgListState);
  const selectedStudy = useRecoilValue(selectedStudyState);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showOuterOptions, setShowOuterOptions] = useState(false);
  const [showInnerOptions, setShowInnerOptions] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEditTitle, setIsEditTitle] = useState(
    new Array(categoryList.length).fill(false)
  );
  const [newTitle, setNewTitle] = useState<{ [key: number]: string }>({});
  const [selectedCgID, setSelectedCgID] = useState(0);

  // console.log("task list: ", taskList);
  // console.log("category ID : ", categoryList);
  // console.log("isToggleSelected: ", isToggleSelected);

  const getHyphens = (length: number) => {
    let num = 16 - length;
    return "-".repeat(num);
  };

  const handleCreateModal = () => {
    setShowOuterOptions(false);
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const handleOuterContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setShowOuterOptions(true);
  };

  const handleInnerContextMenu = (
    event: React.MouseEvent<HTMLDivElement>,
    category_id: number
  ) => {
    event.preventDefault();
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setShowInnerOptions(true);
    setSelectedCgID(category_id);
  };

  const handleCgTitleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditTitle((prev) => {
      const newEditTitle = [...prev];
      newEditTitle[selectedCgID] = true;
      return newEditTitle;
    });
  };

  const handleDeleteModal = () => {
    handleDeleteCategory();
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCategory = () => {
    if (selectedCgID) {
      const updatedCategory = fullCatagoryList.filter(
        (cg) => cg.study_id !== selectedCgID
      );
      setFullCategoryList(updatedCategory);
      setSelectedCgID(0);
    }
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowInnerOptions(false);
    setIsDeleteModalOpen(true);
  };

  const onCreate = async (newCategory: Category) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/api/${selectedStudy?.studyId}/create`,
        {
          category: newCategory,
          studyId: selectedStudy?.studyId,
        }
      );
      console.log(response);
    } catch (e) {
      // console.log(e);
    }
  };

  const handleAddCategory = (newCategory: Category) => {
    setFullCategoryList((prevCategory) => [...prevCategory, newCategory]);
    setCgList((prevCg) => [...prevCg, newCategory]);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    category: Category
  ) => {
    setNewTitle((prev) => ({
      ...prev,
      [category.category_id]: event.target.value,
    }));
  };

  // 카테고리 이름 수정 시 반영이 되기는 하나, 다른 스터디 선택 후 돌아오면 다시 초기화 됨
  // -> 스터디 선택 시 카테고리 리스트를 다시 불러오기 때문
  // 실제 API 연결 시 데이터 저장 필...
  const handleEditTitle = (category_id: number) => {
    const updatedFullCategories = fullCatagoryList.map((cg) =>
      cg.category_id === category_id
        ? { ...cg, title: newTitle[category_id] }
        : cg
    );

    setFullCategoryList(updatedFullCategories);
    const updatedCategories = cgList.map((cg) =>
      cg.category_id === category_id
        ? { ...cg, title: newTitle[category_id] }
        : cg
    );

    setCgList(updatedCategories);
    setIsEditTitle((prev) => {
      const newEditTitle = [...prev];
      newEditTitle[category_id] = false;
      return newEditTitle;
    });
    setNewTitle((prev) => ({ ...prev, [category_id]: "" }));
  };

  const modalRoot = document.querySelector("#modal-container");
  if (!modalRoot) return null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowOuterOptions(false);
        setShowInnerOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return (
    <div className="drawerContent" onContextMenu={handleOuterContextMenu}>
      <div className="categorySpace">
        <div className="algorithmList">Task 목록</div>
        {categoryList.map((category) => {
          // category_id와 일치하는 task들을 필터링
          const filteredTasks = taskList.filter(
            (task) => task.category_id === category.category_id
          );

          return (
            <div className="categoryRow" key={category.category_id}>
              {isEditTitle[category.category_id] ? (
                <>
                  <input
                    type="text"
                    value={newTitle[category.category_id] || category.title}
                    onChange={(event) => handleInputChange(event, category)}
                    maxLength={8}
                  />
                  <button onClick={() => handleEditTitle(category.category_id)}>
                    수정
                  </button>
                </>
              ) : (
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className="categoryTitle"
                  onContextMenu={(event) =>
                    handleInnerContextMenu(event, category.category_id)
                  }
                >
                  <span style={{ marginRight: "0.5rem" }}>
                    {category.title}
                  </span>
                  <span>
                    {getHyphens(category.title ? category.title.length : 0)}
                  </span>
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
              )}
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
      <div style={{ width: "100%", height: "auto" }}></div>
      {showOuterOptions &&
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
              selectedStudy.ownerId &&
              user.memberId === selectedStudy.ownerId && (
                <button className="optionButton" onClick={handleCreateModal}>
                  카테고리 생성
                </button>
              )}
            <button className="optionButton">문제 검색</button>
          </OptionsContainer>,
          modalRoot
        )}

      {showInnerOptions &&
        user &&
        selectedStudy &&
        selectedStudy.ownerId &&
        user.memberId === selectedStudy.ownerId &&
        createPortal(
          <OptionsContainer
            ref={containerRef}
            style={{
              position: "fixed",
              top: menuPosition.y,
              left: menuPosition.x,
              width: "140px",
            }}
          >
            <button className="optionButton" onClick={handleCgTitleEdit}>
              카테고리 이름 변경
            </button>
            <button className="optionButton" onClick={handleDeleteClick}>
              카테고리 삭제
            </button>
          </OptionsContainer>,
          modalRoot
        )}

      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModal}
        onSubmit={onCreate}
        selectedStudy={selectedStudy}
      />

      <DeleteCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModal}
        onConfirm={handleDeleteModal}
      />
    </div>
  );
};

export default CategorySpace;
