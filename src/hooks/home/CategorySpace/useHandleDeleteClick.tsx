export interface useHandleDeleteClickType {
  event: React.MouseEvent<Element, MouseEvent>;
  setShowOuterOptions: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInnerOptions: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useHandleDeleteClick = ({
  event,
  setShowOuterOptions,
  setShowInnerOptions,
  setIsDeleteModalOpen,
}: useHandleDeleteClickType) => {
  function handleDeleteClick() {
    event.stopPropagation();
    setShowOuterOptions(false);
    setShowInnerOptions(false);
    setIsDeleteModalOpen(true);
  }
  return handleDeleteClick;
};

export default useHandleDeleteClick;
