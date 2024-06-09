import { CreateStudy } from '@/styles/modal/CreateStudyStyles';
import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

interface CreateStudyProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (study: { studyName: string; studyImage: File | null }) => void;
}

const CreateStudyModal = React.memo(function CreateStudyModal({ isOpen, onClose, onSubmit }: CreateStudyProps) {
  const [studyName, setStudyName] = useState('');
  const [studyImage, setStudyImage] = useState<File | null>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ studyName, studyImage });
    setStudyName('');
    setStudyImage(null);
    onClose();
  }, [studyName, studyImage, onSubmit, onClose]);

  const handleStudyNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyName(e.target.value);
  }, []);

  const handleStudyImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyImage(e.target.files ? e.target.files[0] : null);
  }, []);

  if (!isOpen) return null;

  const modalRoot = document.querySelector('#root > div > main');
  if (!modalRoot) return null;

  console.log('Modal is open');

  return ReactDOM.createPortal(
    <CreateStudy>
      <div className="modal-content">
        <div className="modal-header">
          스터디 생성
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="study-name">
              <label>스터디 이름</label>
              <input 
                type="text" 
                value={studyName} 
                onChange={handleStudyNameChange} 
                required
              />
            </div>
            <div className="study-image">
              <label>스터디 사진</label>
              <input 
                type="file" 
                onChange={handleStudyImageChange} 
              />
            </div>
            <div className="modal-footer">
              <button type="button" onClick={onClose}>취소</button>
              <button type="submit">생성</button>
            </div>
          </form>
        </div>
      </div>
    </CreateStudy>,
    modalRoot
  );
});

export default CreateStudyModal;
