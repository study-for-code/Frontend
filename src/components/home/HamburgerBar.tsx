import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useCookies } from "react-cookie";

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
import { selectedStudyState, studiesState, userState } from "@/atom/stats";

// types
import { TaskListData } from "@/types/aboutHome";
import useGetOwnerData from "@/hooks/home/useGetOwnerData";

interface HamburgerBarType {
  handleHamburgerBar: () => void;
  handleToggle: (category_id: number) => void;
  handlePage: (data: TaskListData) => void;
  handleSubscribe: () => void;
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
  handleSubscribe,
  goToLoginPage,
}) => {
  const user = useRecoilValue(userState);
  const [studies, setStudies] = useRecoilState(studiesState);
  const [selectedStudy, setSelectedStudy] = useRecoilState(selectedStudyState);
  const [isEditing, setIsEditing] = useState(false); // 제목 수정 모드 상태
  const [newTitle, setNewTitle] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 스터디 삭제 모달 상태
  const [ownerName, setOwnerName] = useState<string>("");

  const [cookies] = useCookies(["accessToken"]);
  const { accessToken } = cookies;

  // 날짜 형식 변환
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

  // 스터디 Host 이름 가져오기
  const getOwnerName = async () => {
    const ownerId = selectedStudy?.ownerId;
    if (ownerId !== undefined) {
      const execute = useGetOwnerData({ setOwnerName, ownerId });
      execute();
    }
  };

  useEffect(() => {
    getOwnerName();
  }, [selectedStudy]);

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
      onModify(selectedStudy.studyId, newTitle);
      setIsEditing(false);
    }
  };

  const refreshStudylist = async (response: AxiosResponse<any, any>) => {
    if (response.data.code === 200) {
      try {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_API_ADDRESS}/studies`,
          {
            headers: headers,
          }
        );
        const data = response.data;
        setStudies(data.results);
        setSelectedStudy(data.results[0]);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onModify = async (studyId: number, title: string) => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const response = await axios.patch(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/studies`,
        {
          studyId: studyId,
          title: title,
        },
        {
          headers: headers,
        }
      );
      refreshStudylist(response);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteStudy = () => {
    if (selectedStudy) {
      onDelete(selectedStudy.studyId);
      handleHamburgerBar();
    }
  };

  const onDelete = async (studyId: number) => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const response = await axios.delete(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/studies/${studyId}`,
        {
          headers: headers,
        }
      );
      refreshStudylist(response);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error("Axios error:", e.response?.data);
      } else {
        console.error(e);
      }
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

  useEffect(() => {
    console.log("selected study", selectedStudy);
  }, [selectedStudy]);

  return (
    <div className="hamburgerBarContainer">
      <div className="drawerSection">
        <div className="hamburgerbutton">
          {showHamburgerBar && selectedStudy && (
            <div className="studyName">
              {/* 이미지 데이터 추가 시 주석 해제 */}
              {/* {selectedStudy.image && (
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
              )} */}
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
                    selectedStudy.ownerId &&
                    user.memberId === selectedStudy.ownerId && (
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

          <img
            src={Hamburger}
            className="hamburgerImage"
            onClick={handleHamburgerBar}
          />
        </div>
        {showHamburgerBar && selectedStudy && (
          <div className="StudyContent">
            <div>개설 날짜: {formattedDate}</div>
            <div>개설자: {ownerName}</div>
            <div>입장코드: {selectedStudy.joinCode}</div>
          </div>
        )}
      </div>
      <CategorySpace
        isToggleSelected={isToggleSelected}
        handleToggle={handleToggle}
        handlePage={handlePage}
        handleSubscribe={handleSubscribe}
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
