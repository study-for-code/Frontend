import { useHandleToggleType } from "@/types/aboutHome";

const useHandleToggle = ({
  isToggleSelected,
  setIsToggleSelected,
  categoryList,
  category_id,
}: useHandleToggleType): (() => void) => {
  function handleToggle() {
    if (isToggleSelected.length > 0) {
      const newArr = [...isToggleSelected];
      newArr[category_id] = !newArr[category_id];
      setIsToggleSelected(newArr);
    } else {
      const newArr: boolean[] = Array(categoryList.length).fill(false);
      newArr[category_id] = true;
      setIsToggleSelected(newArr);
    }
  }
  return handleToggle;
};

export default useHandleToggle;
