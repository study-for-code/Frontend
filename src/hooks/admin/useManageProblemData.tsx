import { problemListType } from "@/types/aboutAdmin";
import axios from "axios";
import { SetStateAction } from "react";

export interface useManageProblemDataType {
  setProblemList: React.Dispatch<SetStateAction<problemListType[]>>;
}

const useManageProblemData = ({
  setProblemList,
}: useManageProblemDataType): (() => Promise<void>) => {
  async function ManageProblemData() {
    try {
      const response = await axios.get("/problemList");
      // console.log(response);
      setProblemList(response.data);
    } catch (err) {
      console.error(err);
    }
  }
  return ManageProblemData;
};

export default useManageProblemData;
