import { useEffect, useState } from "react";

//styles
import { Container } from "@/styles/home/homeStyles";

//img
import LogOut from "@/assets/home/logout.png";
import Expansion from "@/assets/home/expansion.png";
import CategoryExpansion from "@/assets/home/category_expansion.png";
import CategoryExpansion2 from "@/assets/home/category_expansion2.png";

// theme
import { theme } from "@/styles/common/ColorStyles";

// libraries
import axios from "axios";

// components
import CodeReview from "@/components/CodeReview";
import StudyList from "@/components/Study/StudyList";

// types
import { CategoryListData, ComponentMap, PageKey } from "@/types/aboutHome";
import AlgorithmList from "@/components/AlgorithmList";
import { User } from "@/types/User";
import { Study } from "@/types/aboutStudy";
import StudyInformation from "@/components/StudyInformation";

interface CategoryListMap {
  [listName: string]: CategoryListData[];
}

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [studies, setStudies] = useState<Study[] | null>(null);

  // 햄버거바 컨트롤
  const [showHamburgerBar, setShowHamburgerBar] = useState(false);

  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);

  // 카테고리 데이터
  const [categoryList, setCategoryList] = useState<CategoryListMap>({});

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

  const getUserData = async () => {
    try {
      const response = await axios.get("/user");
      const data = response.data;
      console.log(data);
      setUser(data);
    } catch (e) {
      console.log(e);
    }
  }

  const getStudyList = async () => {
    try {
      const response = await axios.get("/studyList");
      const data = response.data;
      console.log("study List : ", data);
      setStudies(data);
    } catch (e) {
      console.log(e);
    }
  }

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

  const addStudy = (newStudy: Study) => {
    if (studies) {
      setStudies([...studies, newStudy]);
    } else {
      setStudies([newStudy]);
    }
  
    // 서버나 다른 데이터 저장소에 새 스터디를 저장하는 로직을 추가할 수 있습니다.
    // 예를 들어:
    // await axios.post('/studies', newStudy);
  };

  const handleHamburgerBar = () => setShowHamburgerBar(!showHamburgerBar);

  const handleStudySelect = (study: Study) => {
    setSelectedStudy(study);
    setShowHamburgerBar(true);
  };

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
    getUserData();
    getStudyList();
  }, []);

  return (
    <Container showhamburgerBar={showHamburgerBar}>
      <nav>
        <div className="header">구름적사고</div>
      </nav>
      <main>
      <StudyList 
        studies={studies || []} 
        addStudy={addStudy} 
        user={user}
        onStudySelect={handleStudySelect}
      />
        <div className="hamburgerBarContainer">
        <StudyInformation 
          study={selectedStudy}
          showHamburgerBar={showHamburgerBar}
          handleHamburgerBar={handleHamburgerBar}
          theme={theme}
          user={user}
        />
          <div className="drawerContent">
            <div className="categorySpace">
              <div className="algorithmList">알고리즘 목록</div>
              {Object.entries(categoryList).map(
                ([listName, value], idx: number) => {
                  return (
                    <div className="categoryRow" key={listName}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ marginRight: "0.5rem" }}>
                          {listName}
                        </span>
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
                }
              )}
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

export default Home;
