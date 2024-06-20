import { createProblemType } from "@/types/aboutAdmin";

export interface useInputDataType {
  setCreateProblem: React.Dispatch<React.SetStateAction<createProblemType>>;
  type: string;
  value: string | number;
}

const useInputData = ({ setCreateProblem, type, value }: useInputDataType) => {
  function inputData() {
    setCreateProblem((prev: createProblemType) => {
      let newValue = value;
      if (typeof value === "string") {
        newValue = isNaN(Number(value)) ? value : Number(value);
      }
      return {
        ...prev,
        [type]: newValue,
      };
    });
  }
  return inputData;
};

export default useInputData;
