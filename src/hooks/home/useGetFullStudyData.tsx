import axios from "axios";

const useGetFullStudyList = ({
  setFullStudies,
}: {
  setFullStudies: React.Dispatch<React.SetStateAction<any[]>>;
}): (() => Promise<void>) => {
  const getFullStudyList = async () => {
    try {
      const response = await axios.get("/fullStudyList");
      const data = response.data;
      setFullStudies(data);
    } catch (e) {
      console.log(e);
    }
  };
  return getFullStudyList;
};

export default useGetFullStudyList;
