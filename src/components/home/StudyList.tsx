import { useState, useEffect, useRef } from 'react';
import GoormThinking from "@/assets/home/goormThinking.jpg";
import Plus from "@/assets/home/plus.png";
import CreateStudyModal from '../modal/CreateStudyModal';
import { Study } from '@/types/aboutStudy';
import { User } from '@/types/User';

interface StudyListProps {
  studies: Study[];
  addStudy: (newStudy: Study) => void;
  user: User | null;
  onStudySelect: (study: Study) => void;
}

const StudyList = ({ studies, addStudy, user, onStudySelect }: StudyListProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
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
              <div key={index} onClick={() => onStudySelect(study)}>
                <img 
                  src={study.image ? URL.createObjectURL(study.image) : GoormThinking} 
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
            user={user}
          />
        </div>
    );
  };
  
  export default StudyList;