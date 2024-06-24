import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

// style
import { ModalContainer } from "@/styles/modal/modalStyles";

// atom
import { useSetRecoilState } from "recoil";
import { selectedStudyState, studiesState } from "@/atom/stats";

interface EnterStudyProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnterStudyModal: React.FC<EnterStudyProps> = ({ isOpen, onClose }) => {
  const [code, setCode] = useState<string>("");
  const setStudies = useSetRecoilState(studiesState);
  const setSelectedStudy = useSetRecoilState(selectedStudyState);

  const [cookies] = useCookies(["accessToken"]);
  const { accessToken } = cookies;

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const onJoin = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_DEPLOYED_API_ADDRESS}/studies/join`,
        null,
        {
          headers: headers,
          params: {
            joinCode: code,
          },
        }
      );
      if (response.data.code === 200) {
        setCode("");
        onClose();
        try {
          const headers = {
            Authorization: `Bearer ${accessToken}`,
          };
          const response = await axios.get(
            `${import.meta.env.VITE_DEPLOYED_API_ADDRESS}/studies`,
            {
              headers: headers,
            }
          );
          const data = response.data;
          setStudies(data.results);
          setSelectedStudy(data.results[0]);
        } catch (e) {
          console.log(e);
        }
      } else if (response.data.code === 404) {
        setCode("");
        alert("스터디 코드에 해당하는 스터디가 없습니다.");
      }
      // refreshStudylist(response);
    } catch (e) {
      console.error(e);
    }
  };

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
          <button onClick={onJoin} className="positiveBtn">
            입장
          </button>
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
