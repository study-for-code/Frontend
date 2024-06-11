// theme
import { theme } from "@/styles/common/ColorStyles";

//img
import LogOut from "@/assets/home/logout.png";
import Hamburger from "@/assets/home/hamburgerBar.png";
import CategoryExpansion from "@/assets/home/category_expansion.png";
import CategoryExpansion2 from "@/assets/home/category_expansion2.png";

// types
import { CategoryListData, CategoryListMap } from "@/types/aboutHome";
import { Study } from "@/types/aboutStudy";
import { User } from "@/types/User";

interface HamburgerBarType {
  handleHamburgerBar: () => void;
  handleToggle: (idx: number) => void;
  handlePage: (data: CategoryListData) => void;
  showHamburgerBar: boolean;
  study: Study | null;
  user: User | null;
  categoryList: CategoryListMap;
  isToggleSelected: boolean[];
  goToLoginPage: () => void;
}

const HamburgerBar: React.FC<HamburgerBarType> = ({
  handleHamburgerBar,
  showHamburgerBar,
  user,
  study,
  categoryList,
  isToggleSelected,
  handleToggle,
  handlePage,
  goToLoginPage,
}) => {

  let formattedDate = 'Invalid Date';
  if (study) {
    try {
      let createAtDate = new Date(study.createAt); // Date 객체로 변환
      if (!isNaN(createAtDate.getTime())) { // 유효한 날짜인지 확인
        formattedDate = createAtDate.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
      }
    } catch (error) {
      console.error('Invalid date format:', error);
    }
  }

  return (
    <div className="hamburgerBarContainer">
      <div className="drawerSection" onClick={handleHamburgerBar}>
        <div className="hamburgerbutton">
          {showHamburgerBar && study && (
            <div className="studyName">
              {study.image && (
              <img
                src={URL.createObjectURL(study.image)}
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  marginRight: "0.5rem",
                  marginLeft: "0.5rem",
                }}
                alt="study"
              />
            )}
              <span
                style={{
                  fontSize: "1.2rem",
                  color: `${theme.fontWhiteColor}`,
                }}
              >
                {study.title}
              </span>
              {user && study.host && (user.email === study.host.email) && (
              <button style={{
                marginLeft: "0.5rem",
                fontSize: "1rem",
                background: "none",
                border: "none",
                color: `${theme.fontWhiteColor}`,
                cursor: "pointer"
              }}>
                수정
              </button>
            )}
            </div>
          )}

          <img src={Hamburger} style={{ marginRight: "1rem" }} />
        </div>
        {showHamburgerBar && study && (
          <div className="StudyContent">
            <div>개설 날짜: {formattedDate}</div>
            <div>개설자: {study.host?.nickname}</div>
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
