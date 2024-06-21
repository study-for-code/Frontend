export interface useHandleDeleteModalType {
  setShowInnerOptions: (value: React.SetStateAction<boolean>) => void;
  setShowOuterOptions: (value: React.SetStateAction<boolean>) => void;
  setIsDeleteModalOpen: (value: React.SetStateAction<boolean>) => void;
}

const useHandleDeleteModal = ({
  setShowInnerOptions,
  setShowOuterOptions,
  setIsDeleteModalOpen,
}: useHandleDeleteModalType) => {
  function handleDeleteModal() {
    setShowInnerOptions(false);
    setShowOuterOptions(false);
    setIsDeleteModalOpen(false);
  }
  return handleDeleteModal;
};

export default useHandleDeleteModal;
