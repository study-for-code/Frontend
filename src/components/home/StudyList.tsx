import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import axios, { AxiosResponse } from "axios";
import { useCookies } from "react-cookie";

// component
import CreateStudyModal from "../modal/CreateStudyModal";
import EnterStudyModal from "../modal/EnterStudyModal";

//atom
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  selectedStudyIndex,
  selectedStudyState,
  studiesState,
  userState,
} from "@/atom/stats";

// type
import { Study } from "@/types/aboutStudy";

// image
import GoormThinking from "@/assets/home/goormThinking.jpg";
import Plus from "@/assets/home/plus.png";
import Admin from "@/assets/home/admin.png";
import { useNavigate } from "react-router-dom";

import { OptionsContainer } from "@/styles/home/homeStyles";

const StudyList = () => {
  const navigation = useNavigate();
  const user = useRecoilValue(userState);

  const [cookies] = useCookies(["accessToken"]);
  const { accessToken } = cookies;
  // const studies = useRecoilValue(studiesState);
  // const setStudies = useSetRecoilState(studiesState);
  // 아래와 같이 하나로 줄일 수 있습니다!
  const [studies, setStudies] = useRecoilState(studiesState);
  const setSelectedStudy = useSetRecoilState(selectedStudyState);
  // 선택된 스터디의 index -> 스터디 이름 수정 후 refresh 시 필요
  const setSelectedStudyIndex = useSetRecoilState(selectedStudyIndex);
  const [showOptions, setShowOptions] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEnterModalOpen, setIsEnterModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePlusClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setShowOptions(true);
  };

  const handleCreateModal = () => {
    setShowOptions(false);
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const handleEnterModal = () => {
    setShowOptions(false);
    setIsEnterModalOpen(!isEnterModalOpen);
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
        console.log(response.data);
        setStudies(data.results);
        setSelectedStudy(data.results[0]);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleSelectStudy = (study: Study, index: number) => {
    setSelectedStudyIndex(index);
    setSelectedStudy(study);
  };

  const onCreate = async (newStudy: { title: string; image: File | null }) => {
    try {
      const { title, image } = newStudy;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const formData = new FormData();
      const studyRequestDto = {
        title: title,
      };
      formData.append(
        "studyRequestDto",
        new Blob([JSON.stringify(studyRequestDto)], {
          type: "application/json",
        })
      );

      if (image) {
        formData.append("multipartFile", image);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/studies`,
        formData,
        {
          headers: headers,
        }
      );
      refreshStudylist(response);
    } catch (e) {
      console.error(e);
    }
  };

  const modalRoot = document.querySelector("#modal-container");
  if (!modalRoot) return null;

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

  // 관리자 페이지 이동
  const goToAdmin = () => navigation("/admin");

  return (
    <div className="drawer">
      <div>
        {Array.isArray(studies) &&
          studies.length > 0 &&
          studies.map((study, index) => (
            <div key={index} onClick={() => handleSelectStudy(study, index)}>
              {study.image ? (
                <img
                  src={
                    study.image
                      ? `${import.meta.env.VITE_LOCAL_API_ADDRESS}/${study.image.imageFileUrl}`
                      : GoormThinking
                  }
                  width="100"
                  className="element1"
                />
              ) : (
                <div className="imageInstead">{study.title}</div>
              )}
            </div>
          ))}
      </div>
      <div className="plusContainer" onClick={handlePlusClick}>
        <img src={Plus} />
        {showOptions &&
          createPortal(
            <OptionsContainer
              className="optionsContainer"
              ref={containerRef}
              style={{
                position: "fixed",
                top: menuPosition.y,
                left: menuPosition.x,
              }}
            >
              <button className="optionButton" onClick={handleCreateModal}>
                스터디 생성
              </button>
              <button className="optionButton" onClick={handleEnterModal}>
                스터디 입장
              </button>
            </OptionsContainer>,
            modalRoot
          )}
      </div>
      {user && user.nickname.toUpperCase() === "ADMIN" && (
        <img src={Admin} className="adminBtn" onClick={goToAdmin} />
      )}

      <CreateStudyModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModal}
        onSubmit={onCreate}
      />

      <EnterStudyModal isOpen={isEnterModalOpen} onClose={handleEnterModal} />
    </div>
  );
};

export default StudyList;
