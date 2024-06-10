// theme
import { theme } from "@/styles/common/ColorStyles";

//img
import GoormThinking from "@/assets/home/goormThinking.jpg";
import LogOut from "@/assets/home/logout.png";
import Hamburger from "@/assets/home/hamburgerBar.png";
import CategoryExpansion from "@/assets/home/category_expansion.png";
import CategoryExpansion2 from "@/assets/home/category_expansion2.png";

// types
import { CategoryListData, CategoryListMap } from "@/types/aboutHome";

interface HamburgerBarType {
  handleHamburgerBar: () => void;
  handleToggle: (idx: number) => void;
  handlePage: (data: CategoryListData) => void;
  showHamburgerBar: boolean;
  categoryList: CategoryListMap;
  isToggleSelected: boolean[];
  goToLoginPage: () => void;
}

const HamburgerBar: React.FC<HamburgerBarType> = ({
  handleHamburgerBar,
  showHamburgerBar,
  categoryList,
  isToggleSelected,
  handleToggle,
  handlePage,
  goToLoginPage,
}) => {
  return (
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

          <img src={Hamburger} style={{ marginRight: "1rem" }} />
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
          {Object.entries(categoryList).map(
            ([listName, value], idx: number) => {
              return (
                <div className="categoryRow" key={listName}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ marginRight: "0.5rem" }}>{listName}</span>
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
          onClick={goToLoginPage}
        />
      </div>
    </div>
  );
};

export default HamburgerBar;
