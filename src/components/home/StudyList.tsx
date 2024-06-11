import { useState, useEffect, useRef } from "react";
import GoormThinking from "@/assets/home/goormThinking.jpg";
import Plus from "@/assets/home/plus.png";
import CreateStudyModal from "../modal/CreateStudyModal";
import { Study } from "@/types/aboutStudy";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedStudyState, studiesState, userState } from "@/atom/stats";
import EnterStudyModal from "../modal/EnterStudyModal";

const StudyList = () => {
  const user = useRecoilValue(userState);
  const studies = useRecoilValue(studiesState);
  const setStudies = useSetRecoilState(studiesState);
  const setSelectedStudy = useSetRecoilState(selectedStudyState);
  const [showOptions, setShowOptions] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEnterModalOpen, setIsEnterModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePlusClick = () => {
    setShowOptions((prevState) => !prevState);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleAddStudy = (newStudy: Study) => {
    setStudies((prevStudies) => [...prevStudies, newStudy]);
    setSelectedStudy(newStudy);
  };

  const handleSelectStudy = (study: Study) => {
    setSelectedStudy(study);
  };

  const handleOpenEnterModal = () => {
    setIsEnterModalOpen(true);
  };

  const handleCloseEnterModal = () => {
    setIsEnterModalOpen(false);
  };

  const handleEnterStudy = (study: Study) => {
    // 추후 스터디 ID로 수정
    const isStudyInList = studies.some((s) => s.title === study.title);
    if (!isStudyInList) {
      setStudies((prevStudies) => [...prevStudies, study]);
      setSelectedStudy(study);
    }
  };

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
    <div className="drawer" ref={containerRef}>
      <div>
        {studies.map((study, index) => (
          <div key={index} onClick={() => handleSelectStudy(study)}>
            <img
              src={
                study.image ? URL.createObjectURL(study.image) : GoormThinking
              }
              alt={study.title}
              width="100"
              className="element1"
            />
          </div>
        ))}
      </div>
      <div className="plusContainer">
        <img src={Plus} onClick={handlePlusClick} />
        {showOptions && (
          <div className="optionsContainer">
            <button className="optionButton" onClick={handleOpenCreateModal}>
              스터디 생성
            </button>
            <button className="optionButton" onClick={handleOpenEnterModal}>
              스터디 입장
            </button>
          </div>
        )}
      </div>

      <CreateStudyModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSubmit={handleAddStudy}
        user={user}
      />

      <EnterStudyModal
        isOpen={isEnterModalOpen}
        onClose={handleCloseEnterModal}
        onEnterStudy={handleEnterStudy}
      />
    </div>
  );
};

export default StudyList;
