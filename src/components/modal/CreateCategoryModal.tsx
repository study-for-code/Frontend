import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { ModalContainer } from "@/styles/modal/modalStyles";

interface CreateCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
}

const CreateCategoryModal = React.memo(function CreateCategoryModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateCategoryProps) {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(title);
      setTitle("");
      onClose();
    },
    [title, onSubmit, onClose]
  );

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  const handleClose = useCallback(() => {
    setTitle("");
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  const modalRoot = document.querySelector("#modal-container");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <ModalContainer>
      <div className="modal-content">
        <div className="modal-header">카테고리 생성</div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="text-input-area">
              <label>카테고리 이름 :</label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                maxLength={10}
                required
              />
            </div>
            <div className="btn-area">
              <button type="submit" className="positiveBtn">
                생성
              </button>
              <button
                type="button"
                className="negativeBtn"
                onClick={handleClose}
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalContainer>,
    modalRoot
  );
});

export default CreateCategoryModal;
