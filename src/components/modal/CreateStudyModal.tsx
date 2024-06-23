import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";

// style
import { ModalContainer } from "@/styles/modal/modalStyles";

interface CreateStudyProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (study: { title: string; image: File | null }) => void;
}

const CreateStudyModal = React.memo(function CreateStudyModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateStudyProps) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const newStudy = { title, image };
      onSubmit(newStudy);
      setTitle("");
      setImage(null);
      setSelectedImage("");
      onClose();
    },
    [title, image, onClose]
  );

  const handletitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  // base64
  const handleimageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setImage(e.target.files ? e.target.files[0] : null);
      const file = e.target.files ? e.target.files[0] : null;

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setSelectedImage(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleClose = useCallback(() => {
    setTitle("");
    setImage(null);
    setSelectedImage("");
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  const modalRoot = document.querySelector("#modal-container");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <ModalContainer>
      <div className="modal-content">
        <div className="modal-header">스터디 생성</div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="text-input-area">
              <label>스터디 이름 :</label>
              <input
                type="text"
                value={title}
                name="title"
                onChange={handletitleChange}
                maxLength={8}
                required
              />
            </div>
            <div className="image-input-area">
              <div>스터디 사진</div>
              <label className="fake-input" htmlFor="file-input">
                파일 선택
              </label>
              <input
                type="file"
                id="file-input"
                onChange={handleimageChange}
                className="real-input"
              />
              <div className="image-preview-container">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected Preview"
                    className="image-preview"
                  />
                ) : (
                  <div>image</div>
                )}
              </div>
            </div>
            <div className="btn-area">
              <button type="submit" className="positiveBtn">
                생성
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="negativeBtn"
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

export default CreateStudyModal;
