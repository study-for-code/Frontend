import { testCaseType } from "@/types/aboutAdmin";
import axios from "axios";

export interface useOnCreateType {
  title: string;
  timeLimit: number;
  memorySize: number;
  explanation: string;
  restrictions: string[];
  testCase: testCaseType[];
}
const useOnCreate = ({
  title,
  timeLimit,
  memorySize,
  explanation,
  restrictions,
  testCase,
}: useOnCreateType) => {
  async function onCreate() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEPLOYED_API_ADDRESS}/algorithms`,
        {
          title,
          timeLimit,
          memorySize,
          explanation,
          restrictions,
        }
      );
      // console.log("create problem : ", response);
      const { algorithmId } = response.data.results[0];

      const response2 = testCase.map((testCase) =>
        axios.post(
          `${import.meta.env.VITE_DEPLOYED_API_ADDRESS}/testcases/${algorithmId}`,
          {
            input: testCase.input,
            output: testCase.output,
          }
        )
      );
      const res = await Promise.all(response2);
      // console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
  return onCreate;
};

export default useOnCreate;
