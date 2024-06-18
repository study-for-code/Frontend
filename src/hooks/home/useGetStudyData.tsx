import { Study } from "@/types/aboutStudy";
import axios from "axios";

const useGetStudyList = ({
  setStudies,
  accessToken,
}: {
  setStudies: React.Dispatch<React.SetStateAction<Study[]>>;

  accessToken: string;
}): (() => Promise<void>) => {
  const getStudiesData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get("http://localhost:8080/studies", {
        headers: headers,
      });
      console.log(response);
      const data = response.data;
      setStudies(data.results);
    } catch (e) {
      console.log(e);
    }
  };
  return getStudiesData;
};

export default useGetStudyList;
