import { CreateStudy } from '@/styles/modal/CreateStudyStyles';
import { User } from '@/types/User';
import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

interface CreateStudyProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (study: { title: string; createAt: Date; image: File | null ; host: User | null ;}) => void;
  user: User | null;
}

const CreateStudyModal = React.memo(function CreateStudyModal({ isOpen, onClose, onSubmit, user }: CreateStudyProps) {
  const [title, settitle] = useState('');
  const createAt = new Date();
  const [image, setimage] = useState<File | null>(null);
  const host = user;

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, createAt, image, host });
    settitle('');
    setimage(null);
    onClose();
  }, [title, image, onSubmit, onClose]);

  const handletitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    settitle(e.target.value);
  }, []);

  const handleimageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setimage(e.target.files ? e.target.files[0] : null);
  }, []);

  if (!isOpen) return null;

  const modalRoot = document.querySelector('#modal-container');
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
                value={title} 
                onChange={handletitleChange} 
                required
              />
            </div>
            <div className="study-image">
              <label>스터디 사진</label>
              <input 
                type="file" 
                onChange={handleimageChange} 
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
