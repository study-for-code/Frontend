import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//styles
import { Container } from "@/styles/home/homeStyles";

//img
import GoormThinking from "@/assets/home/goormThinking.jpg";
import Plus from "@/assets/home/plus.png";
import Expansion from "@/assets/home/expansion.png";

// theme

// libraries

// components
import CodeReview from "@/components/CodeReview";
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

const Home = () => {
  const navigate = useNavigate();
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
  const handleHamburgerBar = () => setShowHamburgerBar(!showHamburgerBar);

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
    getCategoryData();
  }, []);

  return (
    <Container showhamburgerBar={showHamburgerBar}>
      <nav>
        <div className="header">구름적사고</div>
      </nav>
      <main>
        {/* 소희님 작업 부분 */}
        <div className="drawer">
          <img src={GoormThinking} className="element1" />
          <img src={GoormThinking} className="element1" />
          <img src={GoormThinking} className="element1" />
          <div className="plusContainer">
            <img src={Plus} />
          </div>
          {/* 소희님 작업 부분 */}
        </div>
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
