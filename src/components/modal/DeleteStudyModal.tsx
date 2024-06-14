import React from "react";
import ReactDOM from "react-dom";
import { ModalContainer } from "@/styles/modal/modalStyles";

interface DeleteStudyProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  studyTitle: string;
}

const DeleteStudyModal: React.FC<DeleteStudyProps> = ({
  isOpen,
  onClose,
  onConfirm,
  studyTitle,
}) => {
  if (!isOpen) return null;

  const modalRoot = document.querySelector("#modal-container");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <ModalContainer>
      <div className="modal-content">
        <div className="modal-header">스터디 삭제</div>
        <div className="modal-body">
          <p>정말 "{studyTitle}" 스터디를 삭제하시겠어요 ?</p>
          <div className="btn-area">
            <button className="positiveBtn" onClick={onConfirm}>
              예, 삭제할게요
            </button>
            <button className="negativeBtn" onClick={onClose}>
              취소
            </button>
          </div>
        </div>
      </div>
    </ModalContainer>,
    modalRoot
  );
};

export default DeleteStudyModal;
