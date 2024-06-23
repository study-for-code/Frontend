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
import UserIcon from "@/assets/home/User.png";

// component
import DeleteStudyModal from "../modal/DeleteStudyModal";
import CategorySpace from "./hamburgerBar/CategorySpace";

// atom
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedStudyState,
  studiesState,
  userState,
  selectedStudyIndex,
} from "@/atom/stats";

// types
import useGetOwnerData from "@/hooks/home/useGetOwnerData";

interface HamburgerBarType {
  handleHamburgerBar: () => void;
  handleToggle: (category_id: number) => void;
  showHamburgerBar: boolean;
  isToggleSelected: boolean[];
  goToLoginPage: () => void;
}

const HamburgerBar: React.FC<HamburgerBarType> = ({
  handleHamburgerBar,
  showHamburgerBar,
  isToggleSelected,
  handleToggle,
  goToLoginPage,
}) => {
  const user = useRecoilValue(userState);
  const [, setStudies] = useRecoilState(studiesState);
  const [selectedStudy, setSelectedStudy] = useRecoilState(selectedStudyState);
  // 선택된 스터디의 index -> 스터디 이름 수정 후 refresh 시 필요
  const [selectedIndex, setSelectedStudyIndex] =
    useRecoilState(selectedStudyIndex);

  const [isEditing, setIsEditing] = useState(false); // 제목 수정 모드 상태
  const [newTitle, setNewTitle] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 스터디 삭제 모달 상태
  const [ownerName, setOwnerName] = useState<string>("");

  const [cookies] = useCookies(["accessToken", `nickname`]);
  const { accessToken } = cookies;

  // 날짜 형식 변환
  let formattedDate = "Invalid Date";
  if (selectedStudy) {
    try {
      let createAtDate: Date = new Date(selectedStudy.createAt);
      // formattedDate = `${createAtDate[0]}년 ${createAtDate[1]}월 ${createAtDate[2]}일`;
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
        if (selectedIndex > data.results.length) {
          console.log("selected study", data.results[0]);
          setSelectedStudy(data.results[0]);
          setSelectedStudyIndex(0);
        } else {
          console.log("selected study", data.results[selectedIndex]);
          setSelectedStudy(data.results[selectedIndex]);
          setSelectedStudyIndex(selectedIndex);
        }
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

  // useEffect(() => {
  //   console.log("selected study", selectedStudy);
  // }, [selectedStudy]);

  return (
    <div className="hamburgerBarContainer">
      {/* 햄버거 header */}
      <div className="drawerSection">
        <div className="hamburgerbutton">
          {showHamburgerBar && selectedStudy && (
            <div className="studyName">
              {/* 이미지 데이터 추가 시 주석 해제 */}
              {selectedStudy.image && (
                <img
                  src={`${import.meta.env.VITE_LOCAL_API_ADDRESS}/${selectedStudy.image.imageFileUrl}`}
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
                <div className="editAreaStudy">
                  <input
                    type="text"
                    className="editInputStudy"
                    defaultValue={newTitle}
                    onChange={handleTitleChange}
                    onClick={(e) => e.stopPropagation()}
                    maxLength={8}
                  />
                  <button className="editBtnStudy" onClick={handleTitleSave}>
                    Save
                  </button>
                </div>
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
      {/* 햄버거 header */}
      {/* 햄버거 카테고리 섹션 */}
      <CategorySpace
        isToggleSelected={isToggleSelected}
        handleToggle={handleToggle}
      />
      {/* 햄버거 카테고리 섹션 */}
      {/* 햄버거 하단 섹션 */}
      <div className="drawerButton">
        <div className="drawerButtonContainer">
          {showHamburgerBar && (
            <div className="profileContainer">
              <img
                src={UserIcon}
                style={{ border: "1px solid white", borderRadius: "50%" }}
              />
              <span>{cookies.nickname}</span>
            </div>
          )}

          <img className="logOut" src={LogOut} onClick={goToLoginPage} />
        </div>
      </div>
      {/* 햄버거 하단 섹션 */}
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
