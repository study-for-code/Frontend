import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ModalContainer } from "@/styles/modal/modalStyles";
import { Study } from "@/types/aboutStudy";
import axios from "axios";

interface EnterStudyProps {
  isOpen: boolean;
  onClose: () => void;
  onEnterStudy: (study: Study) => void;
}

const EnterStudyModal: React.FC<EnterStudyProps> = ({
  isOpen,
  onClose,
  onEnterStudy,
}) => {
  const [code, setCode] = useState("");
  const [fullStudies, setFullStudies] = useState<Study[]>([]);

  const getFullStudy = async () => {
    try {
      const response = await axios.get("/fullStudyList");
      const data = response.data;
      console.log(data);
      setFullStudies(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleEnter = () => {
    const study = fullStudies.find((study) => study.code === code);
    if (study) {
      onEnterStudy(study);
      onClose();
    } else {
      alert("Invalid study code.");
    }
  };

  useEffect(() => {
    if (isOpen) {
      getFullStudy();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const modalRoot = document.querySelector("#modal-container");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <ModalContainer>
      <div className="modal-content">
        <div className="modal-header">스터디 입장</div>
        <div className="modal-body">
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            placeholder="Enter study code"
          />
        </div>
        <div className="modal-footer">
          <button onClick={handleEnter}>Enter</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </ModalContainer>,
    modalRoot
  );
};

export default EnterStudyModal;
