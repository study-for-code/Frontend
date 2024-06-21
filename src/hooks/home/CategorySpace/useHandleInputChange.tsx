import { SpecificCategoryData } from "@/types/aboutHome";

export interface useHandleInputChangeType {
  setNewTitle: (
    value: React.SetStateAction<{
      [key: number]: string;
    }>
  ) => void;
  event: React.ChangeEvent<HTMLInputElement>;
  category: SpecificCategoryData;
}

const useHandleInputChange = ({
  setNewTitle,
  event,
  category,
}: useHandleInputChangeType) => {
  function handleInputChange() {
    setNewTitle((prev) => ({
      ...prev,
      [category.categoryId]: event.target.value,
    }));
  }
  return handleInputChange;
};

export default useHandleInputChange;
