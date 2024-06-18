import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import axios, { AxiosResponse } from "axios";
import { useCookies } from "react-cookie";

// component
import CreateStudyModal from "../modal/CreateStudyModal";
import EnterStudyModal from "../modal/EnterStudyModal";

//atom
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedStudyState, studiesState, userState } from "@/atom/stats";

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

  const [cookies] = useCookies(["accessToken"]);
  const { accessToken } = cookies;

  const user = useRecoilValue(userState);
  const [studies, setStudies] = useRecoilState(studiesState);
  const setSelectedStudy = useSetRecoilState(selectedStudyState);
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
        console.log(response);
        const data = response.data;
        setStudies(data.results);
        setSelectedStudy(data.results[0]);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onCreate = async (newStudy: { title: string }) => {
    try {
      const { title } = newStudy;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/studies`,
        {
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

  const handleSelectStudy = (study: Study) => {
    setSelectedStudy(study);
  };

  const handleEnterStudy = (study: Study) => {
    const isStudyInList = studies.some((s) => s.title === study.title);
    if (!isStudyInList) {
      setStudies((prevStudies) => [...prevStudies, study]);
      setSelectedStudy(study);
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
            <div key={index} onClick={() => handleSelectStudy(study)}>
              <img
                src={
                  // 이미지 데이터 생기면 주석 해제 -> 현재는 디폴트 이미지로 설정
                  // study.image ? URL.createObjectURL(study.image) :
                  GoormThinking
                }
                width="100"
                className="element1"
              />
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
      {user && user.role === "ADMIN" && (
        <img src={Admin} className="adminBtn" onClick={goToAdmin} />
      )}

      <CreateStudyModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModal}
        onSubmit={onCreate}
      />

      <EnterStudyModal
        isOpen={isEnterModalOpen}
        onClose={handleEnterModal}
        onEnterStudy={handleEnterStudy}
      />
    </div>
  );
};

export default StudyList;
