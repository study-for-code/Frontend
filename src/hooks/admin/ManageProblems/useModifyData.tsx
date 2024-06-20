import { problemListType } from "@/types/aboutAdmin";
import axios from "axios";

export interface useModifyDataType {
  algorithmId: number;
  algorithmTitle: string;
  explanation: string;
  restrictions: string[];
  timeLimit: number;
  memorySize: number;
  setIsModify: React.Dispatch<React.SetStateAction<boolean>>;
  setProblemList: React.Dispatch<React.SetStateAction<problemListType[]>>;
}

const useModifyData = ({
  algorithmId,
  algorithmTitle,
  explanation,
  restrictions,
  timeLimit,
  memorySize,
  setIsModify,
  setProblemList,
}: useModifyDataType) => {
  async function modifyData() {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/algorithms/${algorithmId}`,
        {
          title: algorithmTitle.replace("-", ""),
          explanation,
          restrictions, // string 배열
          timeLimit,
          memorySize,
        }
      );
      setIsModify(false);
      console.log(res);
      const { code } = res.data;
      if (code === 200) {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_API_ADDRESS}/algorithms`
        );
        console.log("refetch Data: ", response);
        const { results } = response.data;
        setProblemList(results);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return modifyData;
};

export default useModifyData;
