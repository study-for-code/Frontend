import { useState, useEffect } from "react";

//styles
import { Container } from "./styles/home/homeStyles";

//img
import GoormThinking from "@/assets/home/goormThinking.jpg";
import LogOut from "@/assets/home/logout.png";
import HamburgerBar from "@/assets/home/hamburgerBar.png";
import Expansion from "@/assets/home/expansion.png";
import CategoryExpansion from "@/assets/home/category_expansion.png";
import CategoryExpansion2 from "@/assets/home/category_expansion2.png";
import { theme } from "./styles/common/ColorStyles";

import StudyList from "./components/Study/StudyList";

interface User {
  id: number;
  name: string;
  studies: Study[];
}

interface Study {
  studyName: string;
  studyImage: File | null;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  // 햄버거바 컨트롤
  const [showHamburgerBar, setShowHamburgerBar] = useState(false);
  // 카테고리 컨트롤
  const [showCategory, setShowCategory] = useState(false);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     // 여기서 실제 API 호출을 통해 사용자 정보를 가져옵니다.
  //     const response = await fetch('/api/user');
  //     const data: User = await response.json();
  //     setUser(data);
  //   };

  //   fetchUser();
  // }, []);

  useEffect(() => {
    // 임시 사용자 데이터를 설정하는 함수
    const fetchUser = async () => {
      // 여기서 실제 API 호출 대신 임시 데이터를 설정합니다.
      const data: User = {
        id: 1,
        name: 'John Doe',
        studies: [
          { studyName: 'study 1', studyImage: null },
          { studyName: 'study 2', studyImage: null },
        ],
      };
      setUser(data);
    };

    fetchUser();
  }, []);

  const addStudy = (newStudy: Study) => {
    if (user) {
      setUser({
        ...user,
        studies: [...user.studies, newStudy],
      });
    }
  };

  console.log('스터디 목록 :', user?.studies);

  const handleHamburgerBar = () => setShowHamburgerBar(!showHamburgerBar);
  const handleCategory = () => setShowCategory(!showCategory);
  return (
    <Container showHamburgerBar={showHamburgerBar}>
      <nav>
        <div className="header">구름적사고</div>
      </nav>
      <main>
        <StudyList studies={user?.studies || []} addStudy={addStudy} />
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

              <img src={HamburgerBar} />
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
              <div className="categoryRow">
                <span>1주차 문제</span>
                <span style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
                  -------------
                </span>
                <img
                  src={showCategory ? CategoryExpansion : CategoryExpansion2}
                  onClick={handleCategory}
                />
              </div>
              <div className="categoryRow">
                <span>2주차 문제</span>
                <span style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
                  -------------
                </span>
                <img src={CategoryExpansion2} />
              </div>
            </div>
          </div>
          <div className="drawerButton">
            <img src={LogOut} style={{ width: "20px", height: "20px" }} />
          </div>
        </div>
        <div className="contentSection">
          <nav className="contentHeader">
            <div className="problemTitle">15888 치킨 배달</div>
          </nav>
        </div>
        <div className="userSection">
          <img src={Expansion} className="expansionButton" />
        </div>
      </main>
    </Container>
  );
};

export default App;
