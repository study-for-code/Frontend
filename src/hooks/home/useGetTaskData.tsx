import axios from "axios";

const useGetTaskList = ({
  setTaskList,
}: {
  setTaskList: React.Dispatch<React.SetStateAction<any>>;
}): (() => Promise<void>) => {
  const getTaskList = async () => {
    try {
      const response = await axios.get("/taskList");
      const data = response.data;
      setTaskList(data);
    } catch (e) {
      console.log(e);
    }
  };
  return getTaskList;
};

export default useGetTaskList;
