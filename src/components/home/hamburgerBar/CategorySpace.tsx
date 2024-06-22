import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// image
import CategoryExpansion from "@/assets/home/category_expansion.png";
import CategoryExpansion2 from "@/assets/home/category_expansion2.png";

// type
import {
  AlgorithmListType,
  PageKey,
  SpecificCategoryData,
  categoryToggleListType,
} from "@/types/aboutHome";
import { problemListType } from "@/types/aboutAdmin";

// component
import CreateCategoryModal from "../../modal/CreateCategoryModal";
import DeleteCategoryModal from "../../modal/DeleteCategoryModal";

// atom
import { useRecoilValue, useRecoilState } from "recoil";
import {
  algorithmLists,
  categoryId,
  categoryListState,
  pageDataState,
  pageState,
  selectedStudyState,
  specificCategoryData,
  userState,
} from "@/atom/stats";

// styles
import { OptionsContainer } from "@/styles/home/homeStyles";

// libraries
import axios from "axios";

// hooks
import useHandleDeleteClick, {
  useHandleDeleteClickType,
} from "@/hooks/home/CategorySpace/useHandleDeleteClick";
import useHandleDeleteModal, {
  useHandleDeleteModalType,
} from "@/hooks/home/CategorySpace/useHandleDeleteModal";
import useHandleInputChange, {
  useHandleInputChangeType,
} from "@/hooks/home/CategorySpace/useHandleInputChange";
import useOnDelete from "@/hooks/home/CategorySpace/useOnDelete";
import useGetAlgorithmList from "@/hooks/admin/AlgorithmList/useGetAlgorithmList";
import CategoryList from "./CategorySpace/CategoryList";

interface CategorySpaceProps {
  isToggleSelected: boolean[];
  handleToggle: (categoryId: number) => void;
}

const CategorySpace: React.FC<CategorySpaceProps> = ({
  isToggleSelected,
  handleToggle,
}) => {
  // 특정 카테고리 아이디 이름
  const [specificCategory, setSpecificCategory] =
    useRecoilState<SpecificCategoryData>(specificCategoryData);
  // 특정 카테고리 리스트

  // 전체 알고리즘 문제 데이터
  const [, setAlgorithmList] =
    useRecoilState<AlgorithmListType[]>(algorithmLists);

  // 카테고리 아이디
  const [CTid, setCTid] = useRecoilState<number>(categoryId);

  // 페이지
  const [, setPage] = useRecoilState<PageKey>(pageState);
  const [pageData, setPageData] =
    useRecoilState<problemListType>(pageDataState);

  const user = useRecoilValue(userState);
  const [categoryList, setCategoryList] =
    useRecoilState<SpecificCategoryData[]>(categoryListState);
  const selectedStudy = useRecoilValue(selectedStudyState);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [showOuterOptions, setShowOuterOptions] = useState<boolean>(false);
  const [showInnerOptions, setShowInnerOptions] = useState<boolean>(false);

  // 우클릭 시 나타나는 버튼 위치
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const [isEditTitle, setIsEditTitle] = useState<boolean[]>(
    new Array(categoryList.length).fill(false)
  );
  const [newTitle, setNewTitle] = useState<{ [key: number]: string }>({});
  const [selectedCgID, setSelectedCgID] = useState<number>(0);

  // 특정 카테고리 데이터 데이터 가져오기
  const getCategory = (data: SpecificCategoryData) => {
    const { categoryId, subscribes, title } = data;
    console.log("getCategory", data);
    setSpecificCategory({
      categoryId,
      subscribes,
      title,
    });
  };

  const getCategoryId = (id: number) => {
    setCTid(id);
  };

  const categoryRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (categoryRowRef.current) {
      categoryRowRef.current.style.maxHeight = "200px"; // 원하는 최대 높이로 설정
      categoryRowRef.current.style.overflowY = "auto"; // 세로 스크롤 추가
    }
  }, []);

  const getCategoryData = async () => {
    if (selectedStudy) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_API_ADDRESS}/categories/${selectedStudy?.studyId}/study`
        );
        const data = response.data;
        setCategoryList(data.results);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleCreateModal = () => {
    setShowOuterOptions(false);
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  // get data
  const getAlgorithmList = async () => {
    const object = {
      setAlgorithmList,
      selectedStudy,
    };
    const execute = useGetAlgorithmList(object);
    execute();
  };

  // 카테고리 생성
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

  // 카테고리 이름 수정
  const handleCgTitleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowOuterOptions(false);
    setShowInnerOptions(false);
    setIsEditTitle((prev) => {
      const newEditTitle = [...prev];
      newEditTitle[selectedCgID] = true;
      return newEditTitle;
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    category: SpecificCategoryData
  ) => {
    const object: useHandleInputChangeType = {
      setNewTitle,
      event,
      category,
    };
    const execute = useHandleInputChange(object);
    execute();
  };

  const handleEditTitle = (categoryId: number) => {
    if (newTitle[categoryId] !== "" || newTitle[categoryId].trim() !== "") {
      onModify(newTitle[categoryId]);

      setIsEditTitle((prev) => {
        const newEditTitle = [...prev];
        newEditTitle[categoryId] = false;
        return newEditTitle;
      });

      setNewTitle((prev) => ({ ...prev, [categoryId]: "" }));
    } else {
      setIsEditTitle((prev) => {
        const newEditTitle = [...prev];
        newEditTitle[categoryId] = false;
        return newEditTitle;
      });
      setNewTitle((prev) => ({ ...prev, [categoryId]: "" }));
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

  // 카테고리 삭제
  const handleDeleteModal = () => {
    const object: useHandleDeleteModalType = {
      setShowInnerOptions,
      setShowOuterOptions,
      setIsDeleteModalOpen,
    };
    const execute = useHandleDeleteModal(object);
    execute();
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    const object: useHandleDeleteClickType = {
      event,
      setShowOuterOptions,
      setShowInnerOptions,
      setIsDeleteModalOpen,
    };
    const execute = useHandleDeleteClick(object);
    execute();
  };

  const onDelete = async () => {
    const object = {
      getCategoryData,
      setSelectedCgID,
      setShowInnerOptions,
      setIsDeleteModalOpen,
      selectedCgID,
    };
    const execute = useOnDelete(object);
    execute();
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

  // 버튼 클릭시 content 섹션 page 변경
  const handlePage = async (page: PageKey, algorithmID?: number) => {
    setShowOuterOptions(false);
    if (algorithmID) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_API_ADDRESS}/algorithms/${algorithmID}`
        );
        const data = response.data;
        if (pageData.algorithmId !== data.results[0].algorithmId) {
          setPageData(data.results[0]);
        }
      } catch (e) {
        console.log(e);
      }
    }
    setPage(page);
  };

  const modalRoot = document.querySelector("#modal-container");
  if (!modalRoot) return null;

  useEffect(() => {
    getCategoryData();
  }, [selectedStudy, specificCategory, CTid]);

  useEffect(() => {
    if (selectedStudy) {
      getCategoryData();
    }
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
        <CategoryList
          categoryList={categoryList}
          isEditTitle={isEditTitle}
          newTitle={newTitle}
          getAlgorithmList={getAlgorithmList}
          handleInputChange={handleInputChange}
          handleEditTitle={handleEditTitle}
          handleInnerContextMenu={handleInnerContextMenu}
          getCategoryId={getCategoryId}
          isToggleSelected={isToggleSelected}
          handleToggle={handleToggle}
          getCategory={getCategory}
          setSpecificCategory={setSpecificCategory}
          CTid={CTid}
          handlePage={handlePage}
        />
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
            <button
              className="optionButton"
              onClick={() => handlePage("algorithmList")}
            >
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
