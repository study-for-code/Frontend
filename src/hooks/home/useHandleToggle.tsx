import { useHandleToggleType } from "@/types/aboutHome";

const useHandleToggle = ({
  isToggleSelected,
  setIsToggleSelected,
  problemList,
  idx,
}: useHandleToggleType): (() => void) => {
  function handleToggle() {
    if (isToggleSelected.length > 0) {
      const newArr = [...isToggleSelected];
      newArr[idx] = !newArr[idx];
      setIsToggleSelected(newArr);
    } else {
      const newArr: boolean[] = Array(problemList.length).fill(false);
      newArr[idx] = true;
      setIsToggleSelected(newArr);
    }
  }
  return handleToggle;
};

export default useHandleToggle;
