import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

//styles
import { Container } from "@/styles/home/homeStyles";

//img
import Expansion from "@/assets/home/expansion.png";

// components
import CodeReview from "@/components/CodeReview";
import StudyList from "@/components/home/StudyList";

// types
import AlgorithmList from "@/components/AlgorithmList";
import HamburgerBar from "@/components/home/HamburgerBar";

// types
import {
  CategoryListData,
  CategoryListMap,
  ComponentMap,
  PageKey,
  useHandleToggleType,
} from "@/types/aboutHome";

// hooks
import useHandleToggle from "@/hooks/home/useHandleToggle";
import useGetCategoryData from "@/hooks/home/useGetCategoryData";
import { useRecoilState } from "recoil";
import { selectedStudyState, studiesState, userState } from "@/atom/stats";

const Home = () => {
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userState);
  const [studies, setStudies] = useRecoilState(studiesState);
  const [selectedStudy, setSelectedStudy] = useRecoilState(selectedStudyState);

  // 햄버거바 컨트롤
  const [showHamburgerBar, setShowHamburgerBar] = useState(false);

  // 카테고리 데이터
  const [categoryList, setCategoryList] = useState<CategoryListMap>({});

  // 페이지 상태
  const [page, setPage] = useState<PageKey>("defaultPage");

  // 문제 리스트
  const [problemList, setProblemList] = useState<string[]>([]);
  // 토글 상태 컨트롤
  const [isToggleSelected, setIsToggleSelected] = useState<boolean[]>([]);
  // 페이지
  const [pageData, setPageData] = useState<CategoryListData>({
    listName: "",
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

  const handlePage = (data: CategoryListData) => {
    setPageData(data);
    setPage("codeReview");
  };

  const getUserData = async () => {
    try {
      const response = await axios.get("/user");
      const data = response.data;
      console.log(data);
      setUser(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getStudyList = async () => {
    try {
      const response = await axios.get("/studyList");
      const data = response.data;
      console.log("study List : ", data);
      setStudies(data);
    } catch (e) {
      console.log("study List error : ", e);
    }
  };

  const getCategoryData = async () => {
    const object = {
      setProblemList,
      setCategoryList,
    };
    const execute = useGetCategoryData(object);
    execute();
  };

  const handleToggle = (idx: number) => {
    const object: useHandleToggleType = {
      isToggleSelected,
      setIsToggleSelected,
      problemList,
      idx,
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
    console.log("pageData: ", pageData);
    console.log("problemList: ", problemList);
  }, [pageData, problemList]);

  useEffect(() => {
    if (studies.length > 0 && !selectedStudy) {
      setSelectedStudy(studies[0]);
    }
  }, [studies, selectedStudy]);

  useEffect(() => {
    getUserData();
    getStudyList();
    getCategoryData();
  }, []);

  useEffect(() => {
    if (selectedStudy) {
      setShowHamburgerBar(true);
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
          categoryList={categoryList}
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
