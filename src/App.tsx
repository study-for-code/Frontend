import { useEffect, useState } from "react";

//styles
import { Container } from "./styles/home/homeStyles";

//img
import GoormThinking from "@/assets/home/goormThinking.jpg";
import Plus from "@/assets/home/plus.png";
import LogOut from "@/assets/home/logout.png";
import HamburgerBar from "@/assets/home/hamburgerBar.png";
import Expansion from "@/assets/home/expansion.png";
import CategoryExpansion from "@/assets/home/category_expansion.png";
import CategoryExpansion2 from "@/assets/home/category_expansion2.png";

// theme
import { theme } from "./styles/common/ColorStyles";

// libraries
import axios from "axios";

// components
import CodeReview from "./components/CodeReview";

// types
import { CategoryListData, ComponentMap, PageKey } from "./types/aboutHome";
import AlgorithmList from "./components/AlgorithmList";

const App = () => {
  // 햄버거바 컨트롤
  const [showHamburgerBar, setShowHamburgerBar] = useState(false);
  // 카테고리 컨트롤
  const [showCategory, setShowCategory] = useState(false);

  // 카테고리 데이터
  const [categoryList, setCategoryList] = useState([]);

  // 페이지 상태
  const [page, setPage] = useState<PageKey>("defaultPage");

  // 문제 리스트
  const [problemList, setProblemList] = useState([]);
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

      const result = data.reduce((acc, curr: CategoryListData) => {
        if (!acc[curr.listName]) {
          acc[curr.listName] = [];
        }
        acc[curr.listName].push(curr);
        return acc;
      }, {});

      setCategoryList(result);
    } catch (e) {
      console.log(e);
    }
  };

  const handleToggle = (idx: number) => {
    if (isToggleSelected.length > 0) {
      const newArr = [...isToggleSelected];
      newArr[idx] = !newArr[idx];
      setIsToggleSelected(newArr);
    } else {
      const newArr: boolean[] = Array(problemList.length).fill(false);
      newArr[idx] = true;
      setIsToggleSelected(newArr);
    }
  };

  const handleHamburgerBar = () => setShowHamburgerBar(!showHamburgerBar);

  const componentMap: ComponentMap = {
    codeReview: <CodeReview pageData={pageData} />,
    algorithmList: <AlgorithmList />,
    defaultPage: null,
  };

  const componentToShow = componentMap[page];

  useEffect(() => {
    console.log("pageData: ", pageData);
  }, [pageData]);

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <Container showhamburgerBar={showHamburgerBar}>
      <nav>
        <div className="header">구름적사고</div>
      </nav>
      <main>
        <div className="drawer">
          <img src={GoormThinking} className="element1" />
          <img src={GoormThinking} className="element1" />
          <img src={GoormThinking} className="element1" />
          <div className="plusContainer">
            <img src={Plus} />
          </div>
        </div>
        <div className="hamburgerBarContainer">
          <div className="drawerSection" onClick={handleHamburgerBar}>
            <div className="hamburgerbutton">
              {showHamburgerBar && (
                <div className="studyName">
                  <img
                    src={GoormThinking}
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                      marginRight: "0.5rem",
                      marginLeft: "0.5rem",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "1.2rem",
                      color: `${theme.fontWhiteColor}`,
                    }}
                  >
                    알고리즘 스터디
                  </span>
                </div>
              )}

              <img src={HamburgerBar} style={{ marginRight: "1rem" }} />
            </div>
            {showHamburgerBar && (
              <div className="StudyContent">
                <div>개설 날짜: 2024.05.31</div>
                <div>참여 인원: 6명</div>
                <div>제출된 코드: 112개</div>
              </div>
            )}
          </div>
          <div className="drawerContent">
            <div className="categorySpace">
              <div className="algorithmList">알고리즘 목록</div>
              {Object.entries(categoryList).map(([key, value], idx: number) => {
                return (
                  <div className="categoryRow" key={key}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "0.5rem" }}>{key}</span>
                      <span>-----------</span>
                      <img
                        style={{ marginLeft: "0.5rem" }}
                        title="week1"
                        src={
                          isToggleSelected[idx]
                            ? CategoryExpansion
                            : CategoryExpansion2
                        }
                        onClick={() => handleToggle(idx)}
                      />
                    </div>

                    {isToggleSelected[idx] &&
                      value.map((item: CategoryListData, index: number) => (
                        <div key={index} className="algorithmProblems">
                          <li
                            style={{ padding: "0.3rem" }}
                            onClick={() => handlePage(item)}
                          >
                            {item.subjectNumber} {item.subjectName}
                          </li>
                        </div>
                      ))}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="drawerButton">
            <img
              src={LogOut}
              style={{ width: "20px", height: "20px", marginBottom: "0.5rem" }}
            />
          </div>
        </div>
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

export default App;
