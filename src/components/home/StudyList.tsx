import { useState, useEffect, useRef } from "react";

// component
import CreateStudyModal from "../modal/CreateStudyModal";
import EnterStudyModal from "../modal/EnterStudyModal";

//atom
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  fullStudiesState,
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

const StudyList = () => {
  const user = useRecoilValue(userState);
  const studies = useRecoilValue(studiesState);
  const setStudies = useSetRecoilState(studiesState);
  const setFullStudies = useSetRecoilState(fullStudiesState);
  const setSelectedStudy = useSetRecoilState(selectedStudyState);
  const [showOptions, setShowOptions] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEnterModalOpen, setIsEnterModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePlusClick = () => {
    setShowOptions((prevState) => !prevState);
  };

  const handleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const handleEnterModal = () => {
    setIsEnterModalOpen(!isEnterModalOpen);
  };

  const handleAddStudy = (newStudy: Study) => {
    setStudies((prevStudies) => [...prevStudies, newStudy]);
    setFullStudies((prevFullStudies) => [...prevFullStudies, newStudy]);
    setSelectedStudy(newStudy);
  };

  const handleSelectStudy = (study: Study) => {
    setSelectedStudy(study);
  };

  const handleEnterStudy = (study: Study) => {
    const isStudyInList = studies.some((s) => s.study_id === study.study_id);
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
            <button className="optionButton" onClick={handleCreateModal}>
              스터디 생성
            </button>
            <button className="optionButton" onClick={handleEnterModal}>
              스터디 입장
            </button>
          </div>
        )}
      </div>
      {user && user.grade === "ADMIN" && (
        <img src={Admin} className="adminBtn" />
      )}

      <CreateStudyModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModal}
        onSubmit={handleAddStudy}
        user={user}
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
