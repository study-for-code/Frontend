import {
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";

// img
import Plus from "@/assets/home/plus_white.png";
import Check from "@/assets/home/check.png";
import axios, { AxiosRequestConfig } from "axios";
import { useRecoilState } from "recoil";
import { AlgorithmListType, SpecificCategoryData } from "@/types/aboutHome";
import {
  algorithmLists,
  categoryId,
  selectedStudyState,
  specificCategoryData,
} from "@/atom/stats";
import { Study } from "@/types/aboutStudy";

export const column: GridColDef[] = [
  {
    field: "algorithmId",
    headerClassName: "super-app-theme--header",
    headerName: "번호",
    width: 100,
  },
  {
    field: "algorithmTitle",
    headerClassName: "super-app-theme--header",
    headerName: "문제 제목",
    width: 312,
  },
  {
    field: "solvedMembers",
    headerClassName: "super-app-theme--header",
    headerName: "푼 사람",
    width: 200,
  },
  {
    field: "SubscribeStatus",
    headerClassName: "super-app-theme--header",
    headerName: "상태",
    flex: 1,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => {
      // 선택된 스터디 정보
      const [selectedStudy, setSelectedStudy] = useRecoilState<Study | null>(
        selectedStudyState
      );
      // 카테고리 아이디
      const [CTid, setCTid] = useRecoilState<number>(categoryId);
      console.log(CTid);
      // 전체 알고리즘 문제 데이터
      const [algorithmList, setAlgorithmList] =
        useRecoilState<AlgorithmListType[]>(algorithmLists);
      // 특정 카테고리 아이디 이름
      const [specificCategory] =
        useRecoilState<SpecificCategoryData>(specificCategoryData);
      const { SubscribeStatus, algorithmId } = params.row;

      const addCategory = async () => {
        console.log("CTid", CTid);
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_LOCAL_API_ADDRESS}/subscribes`,
            {
              categoryId: CTid,
              algorithmId,
            }
          );
          console.log("카테고리 추가 성공: ", res);
          if (res.data.code === 200) {
            const config: AxiosRequestConfig = {
              params: {
                studyId: selectedStudy?.studyId,
              },
            };
            const res = await axios.get(
              `${import.meta.env.VITE_LOCAL_API_ADDRESS}/algorithms/solved`,
              config
            );
            console.log("카테고리 추가 성공 후 전체 데이터 호출: ", res);
            const newResults = res.data.results.map(
              (result: AlgorithmListType) => ({
                algorithmId: result.algorithmId,
                algorithmTitle: result.algorithmTitle,
                solvedMembers: result.solvedMembers,
                SubscribeStatus: result.SubscribeStatus,
              })
            );
            setAlgorithmList(newResults);
          }
        } catch (error) {
          console.log(error);
        }
      };
      if (SubscribeStatus === "NONE") {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img src={Plus} onClick={addCategory} />
          </div>
        );
      } else {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img src={Check} />
          </div>
        );
      }
    },
  },
];
