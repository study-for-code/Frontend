import { Study } from "@/types/aboutStudy";
import axios from "axios";

interface useGetStudyListType {
  setStudies: React.Dispatch<React.SetStateAction<Study[]>>;
  accessToken: string;
}

const useGetStudyList = ({
  setStudies,
  accessToken,
}: useGetStudyListType): (() => Promise<void>) => {
  const getStudiesData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(
        `${import.meta.env.VITE_DEPLOYED_API_ADDRESS}/studies`,
        {
          headers: headers,
        }
      );
      // console.log(response);
      const data = response.data;
      setStudies(data.results);
    } catch (e) {
      console.log(e);
    }
  };
  return getStudiesData;
};

export default useGetStudyList;
