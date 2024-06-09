import { useState, useEffect, useRef } from 'react';
import GoormThinking from "@/assets/home/goormThinking.jpg";
import Plus from "@/assets/home/plus.png";
import CreateStudyModal from './CreateStudyModal';

interface Study {
  studyName: string;
  studyImage: File | null;
}

interface StudyListProps {
  studies: Study[];
  addStudy: (newStudy: Study) => void;
}

const StudyList = ({ studies, addStudy }: StudyListProps) => {
    const [showOptions, setShowOptions] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    // const [studies, setStudies] = useState<Study[]>([]);

    const handlePlusClick = () => {
        setShowOptions(prevState => !prevState);
    };

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const handleAddStudy = (study: Study) => {
      addStudy(study);
    };

    useEffect(() => {  // 2. useEffect 추가
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setShowOptions(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [containerRef]);

    return (
        <div className="drawer" ref={containerRef}>
          <div>
            {studies.map((study, index) => (
              <div key={index}>
                <img 
                  src={study.studyImage ? URL.createObjectURL(study.studyImage) : GoormThinking} 
                  alt={study.studyName} 
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
              <button className="optionButton" onClick={handleOpenModal}>
                스터디 생성
              </button>
              <button className="optionButton" onClick={() => alert('스터디 입장')}>
                스터디 입장
              </button>
            </div>
          )}
          </div>
          
          <CreateStudyModal
            isOpen={isModalOpen} 
            onClose={handleCloseModal} 
            onSubmit={handleAddStudy} 
          />
        </div>
    );
  };
  
  export default StudyList;