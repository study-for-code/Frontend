import axios from "axios";
import { Category } from "@/types/aboutStudy";

const useGetFullCategoryData = ({
  setFullCategoryList,
}: {
  setFullCategoryList: React.Dispatch<React.SetStateAction<any[]>>;
}): (() => Promise<void>) => {
  const getFullCgData = async () => {
    try {
      const response = await axios.get("/categoryList");
      const data: Category[] = response.data;
      setFullCategoryList(data);
    } catch (e) {
      // console.log(e);
    }
  };

  return getFullCgData;
};

export default useGetFullCategoryData;
