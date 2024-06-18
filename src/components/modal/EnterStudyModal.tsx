import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";

// style
import { ModalContainer } from "@/styles/modal/modalStyles";

// type
import { Study } from "@/types/aboutStudy";

// atom

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

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  // const handleEnter = () => {
  //   const study = fullStudies.find((study) => study.code === code);
  //   if (study) {
  //     onEnterStudy(study);
  //     setCode("");
  //     onClose();
  //   } else {
  //     alert("스터디 코드에 해당하는 스터디가 없습니다.");
  //   }
  // };

  const handleClose = useCallback(() => {
    setCode("");
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  const modalRoot = document.querySelector("#modal-container");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <ModalContainer>
      <div className="modal-content">
        <div className="modal-header">스터디 입장</div>
        <div className="modal-body">
          <div className="text-input-area">
            <label>입장 코드를 입력하세요.</label>
            <input
              type="text"
              value={code}
              onChange={handleCodeChange}
              required
            />
          </div>
        </div>
        <div className="btn-area">
          {/* <button onClick={handleEnter} className="positiveBtn">
            입장
          </button> */}
          <button onClick={handleClose} className="negativeBtn">
            취소
          </button>
        </div>
      </div>
    </ModalContainer>,
    modalRoot
  );
};

export default EnterStudyModal;
