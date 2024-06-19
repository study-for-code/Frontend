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
  categoryListState,
  fullCategoryListState,
  selectedStudyState,
  studiesState,
  taskListState,
  userState,
} from "@/atom/stats";

// hooks
import useHandleToggle from "@/hooks/home/useHandleToggle";
import useGetUserData from "@/hooks/home/useGetUserData";
import useGetStudyList from "@/hooks/home/useGetStudyData";
import useGetTaskList from "@/hooks/home/useGetTaskData";
import useGetFullCategoryData from "@/hooks/home/useGetFullCategoryData";

// libraries
import { useCookies } from "react-cookie";
import { User } from "@/types/User";
import useGetCategoryData from "@/hooks/home/useGetCategoryData";
import { Category, Study } from "@/types/aboutStudy";

const Home = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies<string>(["accessToken"]);
  const { accessToken } = cookies;

  // console.log("cookies: ", cookies);

  const [user, setUser] = useRecoilState<User>(userState);
  const [studies, setStudies] = useRecoilState(studiesState);
  const [selectedStudy, setSelectedStudy] =
    useRecoilState<Study>(selectedStudyState);
  const setTaskList = useSetRecoilState(taskListState);
  const [fullCatagoryList, setFullCategoryList] = useRecoilState(
    fullCategoryListState
  );
  const [categoryList, setCategoryList] =
    useRecoilState<Category[]>(categoryListState);

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

  const handleSubscribe = () => {
    setPage("algorithmList");
  };

  const getUserData = async () => {
    const memberId = cookies.memberId;
    const execute = useGetUserData({ setUser, memberId });
    await execute();
  };

  const getStudyList = async () => {
    const execute = useGetStudyList({ setStudies, accessToken });
    execute();
  };

  const getCategoryList = async () => {
    const execute = useGetCategoryData({ setCategoryList, selectedStudy });
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

  // console.log("studies: ", studies);
  // console.log("user: ", user);
  // console.log("selectedStudy: ", selectedStudy);

  useEffect(() => {
    getUserData();
    getStudyList();
    getTaskList();
    getCategoryList();
  }, []);

  // console.log("category list : ", categoryList);

  useEffect(() => {
    if (selectedStudy.studyId > 0) {
      setShowHamburgerBar(true);
    } else {
      setShowHamburgerBar(false);
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
          handleSubscribe={handleSubscribe}
          goToLoginPage={goToLoginPage}
        />
        {page !== "defaultPage" ? (
          <div className="contentSection">{componentToShow}</div>
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
