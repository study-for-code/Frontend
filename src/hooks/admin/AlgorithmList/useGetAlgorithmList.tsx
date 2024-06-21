// types
import { AlgorithmListType } from "@/types/aboutHome";
import { Study } from "@/types/aboutStudy";

// libraries
import axios, { AxiosRequestConfig } from "axios";

export interface useGetAlgorithmListType {
  setAlgorithmList: React.Dispatch<React.SetStateAction<AlgorithmListType[]>>;
  selectedStudy: Study | null;
}
const useGetAlgorithmList = ({
  setAlgorithmList,
  selectedStudy,
}: useGetAlgorithmListType) => {
  async function getAlgorithmList() {
    try {
      // const response = await axios.get(
      //   `${import.meta.env.VITE_LOCAL_API_ADDRESS}/algorithms`
      // );

      const config: AxiosRequestConfig = {
        params: {
          studyId: selectedStudy?.studyId,
        },
      };
      const studyInfo = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/algorithms/solved`,
        config
      );
      // console.log("algorithmList: ", response);
      // console.log("studyInfo: ", studyInfo.data.results);
      // const { results } = response.data;
      const newResults = studyInfo.data.results.map(
        (result: AlgorithmListType) => ({
          algorithmId: result.algorithmId,
          algorithmTitle: result.algorithmTitle,
          solvedMembers: result.solvedMembers,
          SubscribeStatus: result.SubscribeStatus,
        })
      );
      // console.log("newResults: ", newResults);
      setAlgorithmList(newResults);
    } catch (e) {
      console.log(e);
    }
  }
  return getAlgorithmList;
};

export default useGetAlgorithmList;
