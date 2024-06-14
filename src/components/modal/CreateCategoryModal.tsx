import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { ModalContainer } from "@/styles/modal/modalStyles";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fullCategoryListState } from "@/atom/stats";
import { Study } from "@/types/aboutStudy";

interface CreateCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (category: {
    category_id: number;
    title: string;
    study_id: number;
  }) => void;
  selectedStudy: Study | null;
}

const CreateCategoryModal = React.memo(function CreateCategoryModal({
  isOpen,
  onClose,
  onSubmit,
  selectedStudy,
}: CreateCategoryProps) {
  // category_id 설정 로직
  const fullCategoryList = useRecoilValue(fullCategoryListState);
  const setFullCategoryList = useSetRecoilState(fullCategoryListState);

  let category_id: number;
  if (fullCategoryList.length > 0) {
    const lastCategoryId =
      fullCategoryList[fullCategoryList.length - 1].category_id.valueOf();
    category_id = lastCategoryId + 1;
  } else {
    category_id = 1;
  }

  const study_id = selectedStudy ? selectedStudy.study_id : 1;

  const [title, setTitle] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const newCategory = { category_id, title, study_id };
      onSubmit(newCategory);
      setTitle("");
      onClose();
    },
    [title, category_id, study_id, onSubmit, setFullCategoryList, onClose]
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

  console.log("category id : ", category_id);

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
