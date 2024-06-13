import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//styles
import { Container } from "@/styles/home/homeStyles";

//img
import Expansion from "@/assets/home/expansion.png";

// components
import CodeReview from "@/components/CodeReview";
import StudyList from "@/components/home/StudyList";
import AlgorithmList from "@/components/AlgorithmList";
import HamburgerBar from "@/components/home/HamburgerBar";

// types
import {
  ComponentMap,
  PageKey,
  TaskListData,
  useHandleToggleType,
} from "@/types/aboutHome";

// atom
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  cgListState,
  fullCategoryListState,
  fullStudiesState,
  selectedStudyState,
  studiesState,
  taskListState,
  userState,
} from "@/atom/stats";

// hooks
import useHandleToggle from "@/hooks/home/useHandleToggle";
import useGetUserData from "@/hooks/home/useGetUserData";
import useGetStudyList from "@/hooks/home/useGetStudyData";
import useGetFullStudyList from "@/hooks/home/useGetFullStudyData";
import useGetCGData from "@/hooks/home/useGetCGData";
import useGetTaskList from "@/hooks/home/useGetTaskData";
import useGetFullCategoryData from "@/hooks/home/useGetFullCategoryData";

const Home = () => {
  const navigate = useNavigate();

  const setUser = useSetRecoilState(userState);
  const [studies, setStudies] = useRecoilState(studiesState);
  const setFullStudies = useSetRecoilState(fullStudiesState);
  const [selectedStudy, setSelectedStudy] = useRecoilState(selectedStudyState);
  const setCgList = useSetRecoilState(cgListState);
  const setTaskList = useSetRecoilState(taskListState);
  const [fullCatagoryList, setFullCategoryList] = useRecoilState(
    fullCategoryListState
  );

  // 햄버거바 컨트롤
  const [showHamburgerBar, setShowHamburgerBar] = useState(false);

  // 페이지 상태
  const [page, setPage] = useState<PageKey>("defaultPage");

  // 토글 상태 컨트롤
  const [isToggleSelected, setIsToggleSelected] = useState<boolean[]>([]);

  // 페이지
  const [pageData, setPageData] = useState<TaskListData>({
    category_id: 0,
    subjectName: "",
    subjectNumber: 0,
    timeLimit: 0,
    memorySize: 0,
    submit: 0,
    answer: 0,
    person: 0,
    answerRate: 0,
    language: "",
    solveTime: "",
    codes: "",
  });

  const handlePage = (data: TaskListData) => {
    setPageData(data);
    setPage("codeReview");
  };

  const getUserData = async () => {
    const execute = useGetUserData({ setUser });
    execute();
  };

  const getStudyList = async () => {
    const execute = useGetStudyList({ setStudies });
    execute();
  };

  const getFullStudy = async () => {
    const execute = useGetFullStudyList({ setFullStudies });
    execute();
  };

  const getCgData = useGetCGData(setCgList);

  const getFullCategoryList = async () => {
    const execute = useGetFullCategoryData({ setFullCategoryList });
    execute();
  };

  const getTaskList = async () => {
    const execute = useGetTaskList({ setTaskList });
    execute();
  };

  const handleToggle = (category_id: number) => {
    const object: useHandleToggleType = {
      isToggleSelected,
      setIsToggleSelected,
      fullCatagoryList,
      category_id,
    };
    const execute = useHandleToggle(object);
    execute();
  };

  // 햄버거바 컨트롤 함수
  const handleHamburgerBar = () => {
    if (studies.length > 0) {
      setShowHamburgerBar(!showHamburgerBar);
    }
  };

  const goToLoginPage = () => navigate("/Login");

  const componentMap: ComponentMap = {
    codeReview: <CodeReview pageData={pageData} />,
    algorithmList: <AlgorithmList />,
    defaultPage: null,
  };

  const componentToShow = componentMap[page];

  useEffect(() => {
    if (studies.length > 0 && !selectedStudy) {
      setSelectedStudy(studies[0]);
    }
  }, [studies, selectedStudy]);

  console.log("selectedStudy: ", selectedStudy);

  useEffect(() => {
    getUserData();
    getStudyList();
    getFullStudy();
    getTaskList();
    getFullCategoryList();
  }, []);

  useEffect(() => {
    if (selectedStudy) {
      setShowHamburgerBar(true);
      getCgData();
    }
  }, [selectedStudy]);

  return (
    <Container showhamburgerBar={showHamburgerBar}>
      <nav>
        <div className="header">구름적사고</div>
      </nav>
      <main>
        <StudyList />
        <HamburgerBar
          handleHamburgerBar={handleHamburgerBar}
          showHamburgerBar={showHamburgerBar}
          isToggleSelected={isToggleSelected}
          handleToggle={handleToggle}
          handlePage={handlePage}
          goToLoginPage={goToLoginPage}
        />
        {page !== "defaultPage" ? (
          <div className="contentSection">
            <nav className="contentHeader">
              <div className="problemTitle">15888 치킨 배달</div>
            </nav>
            {componentToShow}
          </div>
        ) : (
          <div className="contentSection"></div>
        )}

        <div className="userSection">
          <img src={Expansion} className="expansionButton" />
        </div>
      </main>
    </Container>
  );
};

export default Home;
