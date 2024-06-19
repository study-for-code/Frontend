import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

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
  categoryListState,
  fullCategoryListState,
  selectedStudyState,
  taskListState,
  userState,
} from "@/atom/stats";

import { OptionsContainer } from "@/styles/home/homeStyles";
import DeleteCategoryModal from "../modal/DeleteCategoryModal";

interface CategorySpaceProps {
  isToggleSelected: boolean[];
  handleToggle: (categoryId: number) => void;
  handlePage: (data: TaskListData) => void;
  handleSubscribe: () => void;
}

const CategorySpace: React.FC<CategorySpaceProps> = ({
  isToggleSelected,
  handleToggle,
  handlePage,
  handleSubscribe,
}) => {
  const user = useRecoilValue(userState);
  const taskList = useRecoilValue(taskListState);
  const [categoryList, setCategoryList] =
    useRecoilState<Category[]>(categoryListState);
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

  const [cookies] = useCookies(["accessToken"]);
  const { accessToken } = cookies;

  const getHyphens = (length: number) => {
    let num = 16 - length;
    return "-".repeat(num);
  };

  const getCategoryData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/categories/${selectedStudy?.studyId}/study`
      );
      const data = response.data;
      setCategoryList(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateModal = () => {
    setShowOuterOptions(false);
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const onCreate = async (title: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/categories/${selectedStudy?.studyId}`,
        {
          title: title,
          studyId: selectedStudy?.studyId,
        }
      );
      getCategoryData();
    } catch (e) {
      console.log(e);
    }
  };

  const onModify = async (title: string) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/categories/${selectedCgID}`,
        {
          title: title,
        }
      );
      getCategoryData();
    } catch (e) {
      console.error(e);
    }
  };

  const onDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/categories/${selectedCgID}`
      );
      getCategoryData();
      setSelectedCgID(0);
      setShowInnerOptions(false);
      setIsDeleteModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  // 우클릭 시 버튼 생성
  const handleOuterContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setShowOuterOptions(true);
  };

  // 우클릭 시 버튼 생성
  const handleInnerContextMenu = (
    event: React.MouseEvent<HTMLDivElement>,
    categoryId: number
  ) => {
    event.preventDefault();
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setShowInnerOptions(true);
    setSelectedCgID(categoryId);
  };

  const handleCgTitleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditTitle((prev) => {
      const newEditTitle = [...prev];
      newEditTitle[selectedCgID] = true;
      return newEditTitle;
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    category: Category
  ) => {
    setNewTitle((prev) => ({
      ...prev,
      [category.categoryId]: event.target.value,
    }));
  };

  const handleDeleteModal = () => {
    setShowInnerOptions(false);
    setShowOuterOptions(false);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowOuterOptions(false);
    setShowInnerOptions(false);
    setIsDeleteModalOpen(true);
  };

  const handleEditTitle = (categoryId: number) => {
    onModify(newTitle[categoryId]);

    setIsEditTitle((prev) => {
      const newEditTitle = [...prev];
      newEditTitle[categoryId] = false;
      return newEditTitle;
    });
    setNewTitle((prev) => ({ ...prev, [categoryId]: "" }));
  };

  const handleSubscribePage = () => {
    setShowOuterOptions(false);
    handleSubscribe();
  };

  const modalRoot = document.querySelector("#modal-container");
  if (!modalRoot) return null;

  useEffect(() => {
    getCategoryData();
    console.log(categoryList);
  }, [selectedStudy]);

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
          // categoryId와 일치하는 task들을 필터링
          // const filteredTasks = taskList.filter(
          //   (task) => task.categoryId === category.categoryId
          // );

          return (
            <div className="categoryRow" key={category.categoryId}>
              {isEditTitle[category.categoryId] ? (
                <>
                  <input
                    type="text"
                    value={newTitle[category.categoryId] || category.title}
                    onChange={(event) => handleInputChange(event, category)}
                    maxLength={8}
                  />
                  <button onClick={() => handleEditTitle(category.categoryId)}>
                    수정
                  </button>
                </>
              ) : (
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className="categoryTitle"
                  onContextMenu={(event) =>
                    handleInnerContextMenu(event, category.categoryId)
                  }
                >
                  <span style={{ marginRight: "0.5rem" }}>
                    {category.title}
                  </span>

                  <div className="hr-line"></div>

                  <img
                    style={{ marginLeft: "0.5rem" }}
                    title={`${category.title}}`}
                    src={
                      isToggleSelected[category.categoryId]
                        ? CategoryExpansion
                        : CategoryExpansion2
                    }
                    onClick={() => handleToggle(category.categoryId)}
                  />
                </div>
              )}
              {/* {isToggleSelected[category.categoryId] &&
                filteredTasks.map((task, index: number) => (
                  <div key={index} className="algorithmProblems">
                    <li
                      style={{ padding: "0.3rem" }}
                      onClick={() => handlePage(task)}
                    >
                      {task.subjectNumber} {task.subjectName}
                    </li>
                  </div>
                ))} */}
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
            <button className="optionButton" onClick={handleSubscribePage}>
              문제 검색
            </button>
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
      />

      <DeleteCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModal}
        onConfirm={onDelete}
      />
    </div>
  );
};

export default CategorySpace;