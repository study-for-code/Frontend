import { useState } from "react";

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
import { theme } from "./styles/common/ColorStyles";

const App = () => {
  // 햄버거바 컨트롤
  const [showHamburgerBar, setShowHamburgerBar] = useState(false);
  // 카테고리 컨트롤
  const [showCategory, setShowCategory] = useState(false);

  const handleHamburgerBar = () => setShowHamburgerBar(!showHamburgerBar);
  const handleCategory = () => setShowCategory(!showCategory);
  return (
    <Container showHamburgerBar={showHamburgerBar}>
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
