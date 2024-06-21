import axios from "axios";

export interface useOnDeleteType {
  getCategoryData: () => Promise<void>;
  setSelectedCgID: React.Dispatch<React.SetStateAction<number>>;
  setShowInnerOptions: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCgID: number;
}

const useOnDelete = ({
  getCategoryData,
  setSelectedCgID,
  setShowInnerOptions,
  setIsDeleteModalOpen,
  selectedCgID,
}: useOnDeleteType): (() => Promise<void>) => {
  async function onDelete() {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/categories/${selectedCgID}`
      );
      getCategoryData();
      setSelectedCgID(0);
      setShowInnerOptions(false);
      setIsDeleteModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  }
  return onDelete;
};

export default useOnDelete;
