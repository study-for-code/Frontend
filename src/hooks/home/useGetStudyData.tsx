import axios from "axios";

const useGetStudyList = ({
  setStudies,
}: {
  setStudies: React.Dispatch<React.SetStateAction<any[]>>;
}): (() => Promise<void>) => {
  const getStudyList = async () => {
    try {
      const response = await axios.get("/studyList");
      const data = response.data;
      setStudies(data);
    } catch (e) {
      console.log(e);
    }
  };
  return getStudyList;
};

export default useGetStudyList;
