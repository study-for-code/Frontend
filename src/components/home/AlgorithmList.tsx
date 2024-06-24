import { useEffect, useState } from "react";
import axios from "axios";

// styles
import { AlgorithmListContainer } from "@/styles/home/algorithmStyles";

// libraries
import { Box } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useRecoilState } from "recoil";
import {
  algorithmLists,
  categoryId,
  selectedStudyState,
  specificCategoryData,
  categoryListState,
} from "@/atom/stats";

// constants
import { column } from "./AlgorithmList/AlgorithmListColumn";
// theme
import { theme } from "@/styles/common/ColorStyles";

// types
import { AlgorithmListType, SpecificCategoryData } from "@/types/aboutHome";
import { Study } from "@/types/aboutStudy";

// hooks
import useGetAlgorithmList, {
  useGetAlgorithmListType,
} from "@/hooks/admin/AlgorithmList/useGetAlgorithmList";

const AlgorithmList = () => {
  // 특정 카테고리 아이디 이름
  const [specificCategory] =
    useRecoilState<SpecificCategoryData>(specificCategoryData);
  // 현재 선택된 카테고리
  const [CTid, setCTid] = useRecoilState<number>(categoryId);
  const [selectedStudy] = useRecoilState<Study | null>(selectedStudyState);

  // 전체 카테고리 리스트
  const [categoryList, setCategoryList] =
    useRecoilState<SpecificCategoryData[]>(categoryListState);

  // 전체 알고리즘 문제 데이터
  const [algorithmList, setAlgorithmList] =
    useRecoilState<AlgorithmListType[]>(algorithmLists);
  // 특정 알고리즘 문제 데이터
  const [algorithm, setAlgorithm] = useState<AlgorithmListType>({
    algorithmId: 0,
    algorithmTitle: "",
    solvedMembers: [],
    SubscribeStatus: false,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [responseCode, setResponseCode] = useState(0);

  // get data
  const getAlgorithmList = async () => {
    const object: useGetAlgorithmListType = {
      setAlgorithmList,
      selectedStudy,
    };
    const execute = useGetAlgorithmList(object);
    execute();
    setResponseCode(200);
  };

  //get specific algorithm data
  const getData = (data: AlgorithmListType) => {
    setAlgorithm(data);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (searchTerm !== "") {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DEPLOYED_API_ADDRESS}/algorithms/search`,
          {
            params: {
              studyId: selectedStudy?.studyId,
              title: searchTerm,
            },
          }
        );

        setResponseCode(response.data.code);

        const newResults = response.data.results.map(
          (result: AlgorithmListType) => ({
            algorithmId: result.algorithmId,
            algorithmTitle: result.algorithmTitle,
            solvedMembers: result.solvedMembers,
            SubscribeStatus: result.SubscribeStatus,
          })
        );
        setAlgorithmList(newResults);
      } catch (e) {
        console.log(e);
      }
    } else {
      getAlgorithmList();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (responseCode === 200) {
      const timer = setTimeout(() => {
        setResponseCode(0);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup the timeout on unmount or if responseCode changes
    }
  }, [responseCode]);

  useEffect(() => {
    if (searchTerm === "") {
      getAlgorithmList();
    }
  }, [searchTerm]);

  // useEffect(() => {
  //   console.log("algorithm: ", algorithm);
  // }, [algorithm]);

  return (
    <AlgorithmListContainer>
      <nav className="title">알고리즘 목록</nav>
      <div className="contentArea">
        {/* input */}
        <div className="inputArea">
          <input
            className="input"
            type="text"
            placeholder="알고리즘 검색"
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        {/* 헤더 */}
        <div className="week_header">
          {/* 주차 별로 ment 변경 */}
          {CTid > 0 ? (
            <div key={CTid} className="week_text">
              {specificCategory.title}에 문제 추가하기
            </div>
          ) : (
            <div className="week_text">전체 문제</div>
          )}
          <div className="remoteProblemHeader">
            <span className="alreadySolve">이미 푼 문제</span>
            <span className="addProblems">추가된 문제</span>
          </div>
        </div>
        {/* 알고리즘 리스트 */}
        {responseCode === 200 ? (
          <div className="loaderContainer">
            <span className="loader"></span>
          </div>
        ) : (
          <Box
            sx={{
              "& .super-app-theme--header": {
                backgroundColor: `${theme.lightGray}`,
                borderColor: `${theme.darkGray}`,
                fontFamily: "GmarketSansBold",
                color: "white",
              },
              [`.${gridClasses.cell}`]: {
                fontFamily: "GmarketSansMedium",
                color: "white",
                display: "flex",
                alignItems: "center",
              },
            }}
          >
            <DataGrid
              getRowId={(row) => row.algorithmId}
              rows={algorithmList}
              columns={column}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 6 },
                },
              }}
              pageSizeOptions={[6, 8]}
              onCellClick={(cell) => {
                getData(cell.row);
              }}
            />
          </Box>
        )}
      </div>
    </AlgorithmListContainer>
  );
};

export default AlgorithmList;
