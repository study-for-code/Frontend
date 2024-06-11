import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
// theme
import { theme } from "@/styles/common/ColorStyles";

//img
import LogOut from "@/assets/home/logout.png";
import Hamburger from "@/assets/home/hamburgerBar.png";
import CategoryExpansion from "@/assets/home/category_expansion.png";
import CategoryExpansion2 from "@/assets/home/category_expansion2.png";
import Pen from "@/assets/home/pen.png";
import Trash from "@/assets/home/trash.png";

// types
import { CategoryListData, CategoryListMap } from "@/types/aboutHome";
import { User } from "@/types/User";
import { selectedStudyState, studiesState, userState } from "@/atom/stats";
import DeleteStudyModal from "../modal/DeleteStudyModal";

interface HamburgerBarType {
  handleHamburgerBar: () => void;
  handleToggle: (idx: number) => void;
  handlePage: (data: CategoryListData) => void;
  showHamburgerBar: boolean;
  categoryList: CategoryListMap;
  isToggleSelected: boolean[];
  goToLoginPage: () => void;
}

const HamburgerBar: React.FC<HamburgerBarType> = ({
  handleHamburgerBar,
  showHamburgerBar,
  categoryList,
  isToggleSelected,
  handleToggle,
  handlePage,
  goToLoginPage,
}) => {
  const user = useRecoilValue(userState);
  const [studies, setStudies] = useRecoilState(studiesState); // Recoil 상태에서 studies 가져오기
  const [selectedStudy, setSelectedStudy] = useRecoilState(selectedStudyState);
  const [isEditing, setIsEditing] = useState(false); // 제목 수정 모드 상태
  const [newTitle, setNewTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  let formattedDate = "Invalid Date";
  if (selectedStudy) {
    try {
      let createAtDate = new Date(selectedStudy.createAt); // Date 객체로 변환
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
    event.stopPropagation(); // 이벤트 버블링 방지
    if (selectedStudy) {
      const updatedStudies = studies.map((s) =>
        // 추후 스터디 ID로 수정 필요
        s.host === selectedStudy.host ? { ...s, title: newTitle } : s
      );
      setStudies(updatedStudies);
      setSelectedStudy({ ...selectedStudy, title: newTitle });
      setIsEditing(false);
    }
  };

  const handleDeleteStudy = () => {
    if (selectedStudy) {
      const updatedStudies = studies.filter(
        // 추후 스터디 ID로 수정
        (s) => s.title !== selectedStudy.title
      );
      setStudies(updatedStudies);
      setSelectedStudy(null); // 선택된 스터디 초기화
      handleHamburgerBar();
    }
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsModalOpen(true); // 모달 열기
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleModalConfirm = () => {
    handleDeleteStudy();
    setIsModalOpen(false); // 모달 닫기
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
      {/* {isDeleting && (
        <div className="deleteConfirmation">
          <p>{`"${selectedStudy?.title}" 스터디를 정말 삭제하시겠습니까?`}</p>
          <button onClick={handleDeleteStudy}>예</button>
          <button onClick={handleCancelDelete}>아니오</button>
        </div>
      )} */}
      <div className="drawerContent">
        <div className="categorySpace">
          <div className="algorithmList">알고리즘 목록</div>
          {Object.entries(categoryList).map(
            ([listName, value], idx: number) => {
              return (
                <div className="categoryRow" key={listName}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ marginRight: "0.5rem" }}>{listName}</span>
                    <span>-----------</span>
                    <img
                      style={{ marginLeft: "0.5rem" }}
                      title="week1"
                      src={
                        isToggleSelected[idx]
                          ? CategoryExpansion
                          : CategoryExpansion2
                      }
                      onClick={() => handleToggle(idx)}
                    />
                  </div>

                  {isToggleSelected[idx] &&
                    value.map((item: CategoryListData, index: number) => (
                      <div key={index} className="algorithmProblems">
                        <li
                          style={{ padding: "0.3rem" }}
                          onClick={() => handlePage(item)}
                        >
                          {item.subjectNumber} {item.subjectName}
                        </li>
                      </div>
                    ))}
                </div>
              );
            }
          )}
        </div>
      </div>
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
