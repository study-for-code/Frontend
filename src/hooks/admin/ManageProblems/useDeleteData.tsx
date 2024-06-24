import { problemListType } from "@/types/aboutAdmin";
import axios from "axios";

export interface useDeleteDataType {
  setProblemList: React.Dispatch<React.SetStateAction<problemListType[]>>;
  algorithmId: number;
}

const useDeleteData = ({
  setProblemList,
  algorithmId,
}: useDeleteDataType): (() => Promise<void>) => {
  async function deleteData() {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_DEPLOYED_API_ADDRESS}/algorithms/${algorithmId}`
      );
      // console.log("deleteData: ", response);
      const { code } = response.data;
      if (code === 200) {
        const response = await axios.get(
          `${import.meta.env.VITE_DEPLOYED_API_ADDRESS}/algorithms`
        );
        // console.log("refetch Data: ", response);
        const { results } = response.data;
        setProblemList(results);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return deleteData;
};

export default useDeleteData;
