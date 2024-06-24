import { getTestCaseType } from "@/types/aboutAdmin";
import axios from "axios";

export interface useHandleTestCaseModalType {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTestcaseList: React.Dispatch<React.SetStateAction<getTestCaseType[]>>;
  algorithmId: number;
}

const useHandleTestCaseModal = ({
  setIsModalOpen,
  setTestcaseList,
  algorithmId,
}: useHandleTestCaseModalType): (() => Promise<void>) => {
  async function handleTestCaseModal() {
    setIsModalOpen(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_DEPLOYED_API_ADDRESS}/testcases/${algorithmId}`
      );
      // console.log("testCase: ", res);
      const { results } = res.data;
      // console.log("results: ", results);
      setTestcaseList(results);
    } catch (error) {
      console.log(error);
    }
  }
  return handleTestCaseModal;
};

export default useHandleTestCaseModal;
