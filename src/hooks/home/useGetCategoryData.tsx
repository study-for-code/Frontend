import { CategoryListData, useGetCategoryDataType } from "@/types/aboutHome";
import axios from "axios";

const useGetCategoryData = ({
  setProblemList,
  setCategoryList,
}: useGetCategoryDataType): (() => Promise<void>) => {
  async function getCategoryData() {
    try {
      const response = await axios.get("/categoryList");
      const data = response.data;

      const findStandard = data.filter(
        (element: CategoryListData, idx: number) => {
          return (
            data.findIndex((element1: CategoryListData) => {
              return element1.listName === element.listName;
            }) === idx
          );
        }
      );
      const listNames = findStandard.map(
        (element: CategoryListData) => element.listName
      );
      setProblemList(listNames);

      const result = data.reduce(
        (
          acc: { [key: string]: CategoryListData[] },
          curr: CategoryListData
        ) => {
          if (!acc[curr.listName]) {
            acc[curr.listName] = [];
          }
          acc[curr.listName].push(curr);
          return acc;
        },
        {}
      );

      setCategoryList(result);
    } catch (e) {
      console.log(e);
    }
  }
  return getCategoryData;
};

export default useGetCategoryData;
