import { useEffect, useState } from "react";
// theme
import { theme } from "@/styles/common/ColorStyles";

//img
import LogOut from "@/assets/home/logout.png";
import Hamburger from "@/assets/home/hamburgerBar.png";
import Pen from "@/assets/home/pen.png";
import Trash from "@/assets/home/trash.png";

// component
import DeleteStudyModal from "../modal/DeleteStudyModal";
import CategorySpace from "./CategorySpace";

// atom
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cgListState,
  selectedStudyState,
  studiesState,
  userState,
} from "@/atom/stats";

// types
import { TaskListData } from "@/types/aboutHome";

interface HamburgerBarType {
  handleHamburgerBar: () => void;
  handleToggle: (category_id: number) => void;
  handlePage: (data: TaskListData) => void;
  showHamburgerBar: boolean;
  isToggleSelected: boolean[];
  goToLoginPage: () => void;
}

const HamburgerBar: React.FC<HamburgerBarType> = ({
  handleHamburgerBar,
  showHamburgerBar,
  isToggleSelected,
  handleToggle,
  handlePage,
  goToLoginPage,
}) => {
  const user = useRecoilValue(userState);
  const [studies, setStudies] = useRecoilState(studiesState);
  const [selectedStudy, setSelectedStudy] = useRecoilState(selectedStudyState);
  const [isEditing, setIsEditing] = useState(false); // 제목 수정 모드 상태
  const [newTitle, setNewTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 스터디 삭제 모달 상태
  const cgList = useRecoilValue(cgListState);

  let formattedDate = "Invalid Date";
  if (selectedStudy) {
    try {
      let createAtDate = new Date(selectedStudy.createAt);
      if (!isNaN(createAtDate.getTime())) {
        formattedDate = createAtDate.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      }
    } catch (error) {
      console.error("Invalid date format:", error);
    }
  }

  useEffect(() => {
    if (selectedStudy) {
      setNewTitle(selectedStudy.title);
    }
  }, [selectedStudy]);

  const handleTitleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditing(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleTitleSave = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (selectedStudy) {
      const updatedStudies = studies.map((s) =>
        s.study_id === selectedStudy.study_id ? { ...s, title: newTitle } : s
      );
      setStudies(updatedStudies);
      setSelectedStudy({ ...selectedStudy, title: newTitle });
      setIsEditing(false);
    }
  };

  const handleDeleteStudy = () => {
    if (selectedStudy) {
      const updatedStudies = studies.filter(
        (s) => s.study_id !== selectedStudy.study_id
      );
      setStudies(updatedStudies);
      setSelectedStudy(null); // 선택된 스터디 초기화
      handleHamburgerBar();
    }
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    handleDeleteStudy();
    setIsModalOpen(false);
  };

  return (
    <div className="hamburgerBarContainer">
      <div className="drawerSection" onClick={handleHamburgerBar}>
        <div className="hamburgerbutton">
          {showHamburgerBar && selectedStudy && (
            <div className="studyName">
              {selectedStudy.image && (
                <img
                  src={URL.createObjectURL(selectedStudy.image)}
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    marginRight: "0.5rem",
                    marginLeft: "0.5rem",
                  }}
                  alt="study"
                />
              )}
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={handleTitleChange}
                    onClick={(e) => e.stopPropagation()}
                    style={{ width: "50px" }}
                    maxLength={8}
                  />
                  <button onClick={handleTitleSave}>Save</button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      fontSize: "1.2rem",
                      color: `${theme.fontWhiteColor}`,
                    }}
                  >
                    {selectedStudy.title}
                  </span>
                  {user &&
                    selectedStudy.host &&
                    user.email === selectedStudy.host.email && (
                      <>
                        <img
                          src={Pen}
                          className="updateStudyName"
                          onClick={handleTitleEdit}
                          alt="Edit"
                        />
                        <img
                          src={Trash}
                          className="updateStudyName"
                          onClick={handleDeleteClick}
                          alt="Delete"
                        />
                      </>
                    )}
                </>
              )}
            </div>
          )}

          <img src={Hamburger} style={{ marginRight: "1rem" }} />
        </div>
        {showHamburgerBar && selectedStudy && (
          <div className="StudyContent">
            <div>개설 날짜: {formattedDate}</div>
            <div>개설자: {selectedStudy.host?.nickname}</div>
          </div>
        )}
      </div>
      <CategorySpace
        categoryList={cgList}
        isToggleSelected={isToggleSelected}
        handleToggle={handleToggle}
        handlePage={handlePage}
      />
      <div className="drawerButton">
        <img
          src={LogOut}
          style={{ width: "20px", height: "20px", marginBottom: "0.5rem" }}
          onClick={goToLoginPage}
        />
      </div>

      <DeleteStudyModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        studyTitle={selectedStudy?.title || ""}
      />
    </div>
  );
};

export default HamburgerBar;
