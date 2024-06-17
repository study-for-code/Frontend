import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";

// type
import { User } from "@/types/User";

// atom
import { useRecoilValue } from "recoil";
import { fullStudiesState } from "@/atom/stats";

// style
import { ModalContainer } from "@/styles/modal/modalStyles";
import axios from "axios";

interface CreateStudyProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (study: {
    study_id: number;
    title: string;
    createAt: Date;
    image: File | null;
    host: User | null;
    code: string;
  }) => void;
  user: User | null;
}

const CreateStudyModal = React.memo(function CreateStudyModal({
  isOpen,
  onClose,
  onSubmit,
  user,
}: CreateStudyProps) {
  const fullStudies = useRecoilValue(fullStudiesState);

  // study_id 설정 로직
  // let study_id: number;
  // if (fullStudies.length > 0) {
  //   const lastStudyId = fullStudies[fullStudies.length - 1].study_id.valueOf();
  //   study_id = lastStudyId + 1;
  // } else {
  //   study_id = 1;
  // }
  // 백엔드 연결 후 수정 필

  // 스터디 이름
  const [title, setTitle] = useState("");
  // 생성 일시
  const createAt = new Date();
  const [image, setImage] = useState<File | null>(null);
  // null 말고 "" 이렇게 기본값 넣어주시면 됩니다.
  const [selectedImage, setSelectedImage] = useState<string>("");
  const host = user;
  // 입장 코드
  const [code, setCode] = useState("");

  const [userData, setUserData] = useState({
    title: "",
    code: "",
    selectedImage: "",
  });

  const handleInputData = (type: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  useEffect(() => {
    console.log("userData: ", userData);
  }, [userData]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // onSubmit({ study_id, title, createAt, image, host, code });
      setTitle("");
      setImage(null);
      setCode("");
      setSelectedImage("");
      onClose();
    },
    [title, image, onSubmit, onClose]
  );

  const handletitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  const handlecodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCode(e.target.value);
    },
    []
  );

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

  // console.log("selectedImage: ", selectedImage);

  const handleClose = useCallback(() => {
    setTitle("");
    setImage(null);
    setCode("");
    setSelectedImage("");
    onClose();
  }, [onClose]);

  // console.log("study id : ", study_id);

  if (!isOpen) return null;

  const modalRoot = document.querySelector("#modal-container");
  if (!modalRoot) return null;

  // api 생성
  const createStudy = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/studies`,
        {
          id: code,
          title,
        }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

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
                onChange={(e) => handleInputData(e.target.name, e.target.value)}
                maxLength={8}
                required
              />
            </div>
            <div className="text-input-area">
              <label>스터디 입장 코드 :</label>
              <input
                type="text"
                value={code}
                name="code"
                onChange={(e) => handleInputData(e.target.name, e.target.value)}
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
              {/* <button type="submit" className="positiveBtn">
                생성
              </button> */}
              <button onClick={createStudy} className="positiveBtn">
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
