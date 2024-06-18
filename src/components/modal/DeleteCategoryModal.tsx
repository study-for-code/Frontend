import React from "react";
import ReactDOM from "react-dom";
import { ModalContainer } from "@/styles/modal/modalStyles";

interface DeleteCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteCategoryModal: React.FC<DeleteCategoryProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const modalRoot = document.querySelector("#modal-container");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <ModalContainer>
      <div className="modal-content">
        <div className="modal-header">스터디 삭제</div>
        <div className="modal-body">
          <p>정말 해당 카테고리를 삭제하시겠어요 ?</p>
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

export default DeleteCategoryModal;
