import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//styles
import { Container } from "@/styles/home/homeStyles";

// components
import CodeReview from "@/components/home/CodeReview";
import StudyList from "@/components/home/StudyList";
import AlgorithmList from "@/components/home/AlgorithmList";
import AlgorithmDescription from "@/components/AlgorithmDescription";
import HamburgerBar from "@/components/home/HamburgerBar";

// types
import { ComponentMap, PageKey, useHandleToggleType } from "@/types/aboutHome";

// atom
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  categoryListState,
  pageDataState,
  pageState,
  selectedStudyState,
  studiesState,
  userSectionState,
  userState,
} from "@/atom/stats";

// hooks
import useHandleToggle from "@/hooks/home/useHandleToggle";
import useGetUserData from "@/hooks/home/useGetUserData";
import useGetTaskList from "@/hooks/home/useGetTaskData";

// libraries
import { useCookies } from "react-cookie";
import { User } from "@/types/User";
import useGetCategoryData from "@/hooks/home/useGetCategoryData";
import { Category, Study } from "@/types/aboutStudy";
import { problemListType } from "@/types/aboutAdmin";
import CodeIDE from "@/components/CodeIDE";
import UserSection from "@/components/home/UserSection";

const Home = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies<string>(["accessToken"]);
  const { accessToken } = cookies;

  // console.log("cookies: ", cookies);

  const [user, setUser] = useRecoilState<User>(userState);
  const [studies, setStudies] = useRecoilState(studiesState);
  const [selectedStudy, setSelectedStudy] = useRecoilState<Study | null>(
    selectedStudyState
  );

  const [categoryList, setCategoryList] =
    useRecoilState<Category[]>(categoryListState);

  // 햄버거바 컨트롤
  const [showHamburgerBar, setShowHamburgerBar] = useState(false);

  const [showUserSection, setShowUserSection] =
    useRecoilState(userSectionState);

  // 페이지 상태
  const [page, setPage] = useRecoilState<PageKey>(pageState);

  // 토글 상태 컨트롤
  const [isToggleSelected, setIsToggleSelected] = useState<boolean[]>([]);

  // 페이지
  const [pageData, setPageData] =
    useRecoilState<problemListType>(pageDataState);

  const getUserData = async () => {
    const memberId = cookies.memberId;
    if (memberId === undefined) {
      goToLoginPage();
    }
    const execute = useGetUserData({ setUser, memberId });
    await execute();
  };

  const getStudyList = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/studies`,
        {
          headers: headers,
        }
      );
      const data = response.data;
      setStudies(data.results);
      if (data.results.length > 0) {
        setSelectedStudy(data.results[0]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getCategoryList = async () => {
    if (selectedStudy) {
      const execute = useGetCategoryData({ setCategoryList, selectedStudy });
      execute();
    }
  };

  const handleToggle = (category_id: number) => {
    const object: useHandleToggleType = {
      isToggleSelected,
      setIsToggleSelected,
      categoryList,
      category_id,
    };
    const execute = useHandleToggle(object);
    execute();
  };

  // 햄버거바 컨트롤 함수
  const handleHamburgerBar = () => {
    if (page === "codeIde") {
      setPage("algorithmDescription");
      setShowHamburgerBar(!showHamburgerBar);
    } else if (studies.length > 0) {
      setShowHamburgerBar(!showHamburgerBar);
    }
  };

  const goToLoginPage = () => navigate("/Login");

  const componentMap: ComponentMap = {
    codeReview: <CodeReview pageData={pageData} />,
    algorithmList: <AlgorithmList />,
    algorithmDescription: <AlgorithmDescription />,
    codeIde: <CodeIDE />,
    defaultPage: null,
  };

  useEffect(() => {
    if (studies.length > 0 && !selectedStudy) {
      setSelectedStudy(studies[0]);
    } else if (studies.length === 0) {
      setSelectedStudy(null);
    }
  }, [studies]);

  useEffect(() => {
    getStudyList();
    setSelectedStudy(null);
    setPage("defaultPage");
  }, [user]);

  useEffect(() => {
    getUserData();
    getCategoryList();
  }, []);

  let componentToShow = componentMap[page];

  useEffect(() => {
    if (page === "codeIde") {
      setShowHamburgerBar(false);
      setShowUserSection(false);
    }
    componentToShow = componentMap[page];
  }, [page]);

  useEffect(() => {
    if (selectedStudy && selectedStudy.studyId > 0) {
      setShowHamburgerBar(true);
    } else {
      setShowHamburgerBar(false);
    }
  }, [selectedStudy]);

  // useEffect(() => {
  //   console.log("categoryList: ", categoryList);
  //   console.log("isToggleSelected: ", isToggleSelected);
  // }, [categoryList, isToggleSelected]);

  return (
    <Container
      showhamburgerBar={showHamburgerBar}
      showUserSection={showUserSection}
    >
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
          goToLoginPage={goToLoginPage}
        />
        {page !== "defaultPage" ? (
          <div className="contentSection">{componentToShow}</div>
        ) : (
          <div className="contentSection"></div>
        )}

        <UserSection />
      </main>
    </Container>
  );
};

export default Home;
