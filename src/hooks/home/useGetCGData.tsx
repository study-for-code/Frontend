import { useRecoilValue } from "recoil";
import axios from "axios";
import { selectedStudyState } from "@/atom/stats";
import { Category } from "@/types/aboutStudy";

const useGetCGData = (
  setCgList: React.Dispatch<React.SetStateAction<Category[]>>
) => {
  const selectedStudy = useRecoilValue(selectedStudyState);

  console.log("selected Study: ", selectedStudy);

  const getCgData = async () => {
    try {
      const response = await axios.get("/categoryList");
      const data: Category[] = response.data;
      if (selectedStudy) {
        const filteredData = data.filter(
          (item) => item.study_id === selectedStudy.study_id
        );
        setCgList(filteredData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return getCgData;
};

export default useGetCGData;
