import axios from "axios";
import { Category, Study } from "@/types/aboutStudy";

interface useGetCategoryDataType {
  setCategoryList: React.Dispatch<React.SetStateAction<Category[]>>;
  selectedStudy: Study;
}

const useGetCategoryData = ({
  setCategoryList,
  selectedStudy,
}: useGetCategoryDataType): (() => Promise<void>) => {
  const getCategoryData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/categories/${selectedStudy?.studyId}/study`
      );
      const data = response.data;
      setCategoryList(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  return getCategoryData;
};

export default useGetCategoryData;
